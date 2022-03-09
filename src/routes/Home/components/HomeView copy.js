import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useHistory } from "react-router-dom"
import queryString from 'query-string'
import Web3 from 'web3'

import lib from 'lib/commons'
import config from 'config/common'

const HomeView = ({
}) => {

  const [account, setAccount] = useState(null)
  const [contactList, setContactList] = useState(null);
  const [contacts, setContacts] = useState([]);

  const CONTACT_ABI = config.CONTACT_ABI
  const CONTACT_ADDRESS = config.CONTACT_ADDRESS

  useEffect(() => {
    const load = async () => {
      const web3 = new Web3(Web3.givenProvider || 'http://localhost:7545')
      const accounts = await web3.eth.requestAccounts()

      setAccount(accounts?.[0])

      const contactList = new web3.eth.Contract(CONTACT_ABI, CONTACT_ADDRESS)

      setContactList(contactList)

      const counter = await contactList.methods.count().call()
      let tmpContacts = []

      for (let index = 1; index <= counter; index++) {
        const contact = await contactList.methods.contacts(index).call()

        tmpContacts.push(contact)
      }

      // for (let index = 0; index < 10; index++) {
      //   const contact = await contactList.methods.createContact('Deeds ' + (index + 1), '1231232').call()
      //   console.log(contact)
      // }

      setContacts(tmpContacts)
    }

    load()
  }, [])

  console.log()

  return (
    <>
      <div className="main-content main-home">
        Your account address: {account}

        <ul>
          {Object.keys(contacts).map((contact, index) => (
            <li key={`${contacts[index].name}-${index}`}>
              <h4>{contacts[index].name}</h4>
              <span><b>Phone: </b>{contacts[index].phone}</span>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export default HomeView
