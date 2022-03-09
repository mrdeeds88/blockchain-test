import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useHistory } from "react-router-dom"
import queryString from 'query-string'
import Web3 from 'web3'

import lib from 'lib/commons'
import config from 'config/common'
import request from 'lib/request'

const HomeView = ({
}) => {

  const [account, setAccount] = useState(null)
  const [name, setName] = useState('')
  const [FakeTokenContract, setFakeTokenContract] = useState(null)
  const [FakeNFTContract, setFakeNFTContract] = useState(null)
  const [tokenName, setTokenName] = useState(null)
  const [tokenBalance, setTokenBalance] = useState(0)
  const [NFTList, setNFTList] = useState([])

  const TOKEN_CONTRACT_ABI = config.TOKEN_CONTRACT_ABI
  const TOKEN_CONTRACT_ADDRESS = config.TOKEN_CONTRACT_ADDRESS

  const NFT_CONTRACT_ABI = config.NFT_CONTRACT_ABI
  const NFT_CONTRACT_ADDRESS = config.NFT_CONTRACT_ADDRESS

  const load = async () => {
    const web3 = new Web3(Web3.givenProvider || 'https://bc.ved.vn:18545')
    const accounts = await web3.eth.requestAccounts()

    setAccount(accounts?.[0])

    setFakeTokenContract(new web3.eth.Contract(TOKEN_CONTRACT_ABI, TOKEN_CONTRACT_ADDRESS))
    setFakeNFTContract(new web3.eth.Contract(config.NFT_CONTRACT_ABI, config.NFT_CONTRACT_ADDRESS))      
  }

  useEffect(() => {

    load()
    
  }, [])

  useEffect(() => {
    if(FakeTokenContract && FakeNFTContract) {
      const eventToken = FakeTokenContract.events.Transfer(function(error, result) {
        if (error) return
        console.log(result)
      })
      const eventNFT = FakeNFTContract.events.Transfer(function(error, result) {
        if (error) return
        console.log(result)
      })

      FakeTokenContract.methods.symbol().call().then(res => {
        setTokenName(res)
      })

      FakeTokenContract.methods.balanceOf(account).call().then(res => {
        setTokenBalance((res/10**18).toFixed(2))
      })

      FakeNFTContract.methods.getStore().call().then(res => {
        setNFTList(res)
      })
    }
  }, [FakeTokenContract, FakeNFTContract])
  /** Start */

  const handleRoll = (e) => {
    if(!account) {
      load()
      return false
    }
    let decimals = Web3.utils.toBN(18)

    const randomToken = [5, 10, 100, 1000, 2000, 5000]
    const randomNFT = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    let tokenOrNft = Math.floor(Math.random() * (2 - 1 + 1) + 1) //1 TOKEN, 2 NFT

    if(tokenOrNft == 1) {
      let tokenAmount = randomToken[Math.floor(Math.random()*randomToken.length)];
      let transferAmount = Web3.utils.toBN(tokenAmount).mul(Web3.utils.toBN(10).pow(decimals))

      FakeTokenContract.methods.addToken(transferAmount).send({
        from: account
      }, (err, txHash) => {
        if(err) {
          lib.showMessage(err.message)
        } else if(txHash) {
          setTokenBalance((parseFloat(tokenBalance) + parseFloat(tokenAmount)).toFixed(2))
          lib.showMessage(`You received ${tokenAmount} ${tokenName}`, null, 'Congratulations!')
        }
      })
    }

    if(tokenOrNft == 2) {
      let nftID = randomNFT[Math.floor(Math.random()*randomNFT.length)]
      let transferAmount = Web3.utils.toBN(nftID).mul(Web3.utils.toBN(10).pow(decimals))

      FakeNFTContract.methods.addToken(transferAmount).send({
        from: account
      }, (err, txHash) => {
        if(err) {
          lib.showMessage(err.message)
        } else if(txHash) {
          setNFTList([
            ...NFTList,
            nftID
          ])
          lib.showMessage(`You received <br> <img src="/images/NFT/${nftID}.png" alt="" />`, null, 'Congratulations')
        }
      })
    }
  }

  return (
    <>
      <div className="main-content main-home">
        <div className="main-app">
          Hi, Your account address: {account}
          <p>
          {FakeTokenContract && (
            <>Your {tokenName} balance: {tokenBalance}</>
          )}
          </p>

          <div className="container">
            <div className="row">
              <div className="col-12">
                <br/>
                <a href="#" onClick={e => handleRoll(e)} className="btn">Try your luck</a>
              </div>
            </div>
          </div>
          <br/>
          <br/>
          <br/>
          <p>Your collection:</p>

          <div className="row">
            {NFTList.length > 0 && NFTList.map((nft, index) => (
              <div className="col-6 col-md-2 nft" key={index}>
                <img src={`/images/NFT/${nft}.png`} alt="" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}

export default HomeView
