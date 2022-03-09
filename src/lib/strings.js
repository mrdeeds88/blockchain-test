import config from 'config/app.js';

/**
 * Is empty, null or all spaces string
 */
let isEmpty = (s) => {
	return s == null || (s + '').replace(/\s/g, "").length == 0;
};

/**
 * Convert string or number to pretty format
 * Example: 1000 to 1,000
 */
const TO_PRETTY_SEPERATOR = '.';
const TO_PRETTY_NA = 'NA';

let toPretty = (count) => {
  if (count == null || count.toString().match(/^\-?[0-9]+(\.[0-9]+)?$/) == null) {
    return TO_PRETTY_NA;
  }
  return count.toString().replace(/\B(?=(\d{3})+(?!\d))/g, TO_PRETTY_SEPERATOR);
};


/**
 * Add String.format function
 * Example: Strings.format('hello {0}', 'Tho') --> 'hello Tho'
 */
let format = function() {
  let s = arguments[0];
  for (let i = 0; i < arguments.length - 1; i++) {
    let reg = new RegExp("\\{" + i + "\\}", "gm");
    s = s.replace(reg, arguments[i + 1]);
  }
  return s;
}

const VIETNAMESE_N_ASCII_MAP = {
  "à": "a", "ả": "a", "ã": "a", "á": "a", "ạ": "a", "ă": "a", "ằ": "a", "ẳ": "a", "ẵ": "a",
  "ắ": "a", "ặ": "a", "â": "a", "ầ": "a", "ẩ": "a", "ẫ": "a", "ấ": "a", "ậ": "a", "đ": "d",
  "è": "e", "ẻ": "e", "ẽ": "e", "é": "e", "ẹ": "e", "ê": "e", "ề": "e", "ể": "e", "ễ": "e",
  "ế": "e", "ệ": "e", "ì": 'i', "ỉ": 'i', "ĩ": 'i', "í": 'i', "ị": 'i', "ò": 'o', "ỏ": 'o',
  "õ": "o", "ó": "o", "ọ": "o", "ô": "o", "ồ": "o", "ổ": "o", "ỗ": "o", "ố": "o", "ộ": "o",
  "ơ": "o", "ờ": "o", "ở": "o", "ỡ": "o", "ớ": "o", "ợ": "o", "ù": "u", "ủ": "u", "ũ": "u",
  "ú": "u", "ụ": "u", "ư": "u", "ừ": "u", "ử": "u", "ữ": "u", "ứ": "u", "ự": "u", "ỳ": "y",
  "ỷ": "y", "ỹ": "y", "ý": "y", "ỵ": "y", "À": "A", "Ả": "A", "Ã": "A", "Á": "A", "Ạ": "A",
  "Ă": "A", "Ằ": "A", "Ẳ": "A", "Ẵ": "A", "Ắ": "A", "Ặ": "A", "Â": "A", "Ầ": "A", "Ẩ": "A",
  "Ẫ": "A", "Ấ": "A", "Ậ": "A", "Đ": "D", "È": "E", "Ẻ": "E", "Ẽ": "E", "É": "E", "Ẹ": "E",
  "Ê": "E", "Ề": "E", "Ể": "E", "Ễ": "E", "Ế": "E", "Ệ": "E", "Ì": "I", "Ỉ": "I", "Ĩ": "I",
  "Í": "I", "Ị": "I", "Ò": "O", "Ỏ": "O", "Õ": "O", "Ó": "O", "Ọ": "O", "Ô": "O", "Ồ": "O",
  "Ổ": "O", "Ỗ": "O", "Ố": "O", "Ộ": "O", "Ơ": "O", "Ờ": "O", "Ở": "O", "Ỡ": "O", "Ớ": "O",
  "Ợ": "O", "Ù": "U", "Ủ": "U", "Ũ": "U", "Ú": "U", "Ụ": "U", "Ư": "U", "Ừ": "U", "Ử": "U",
  "Ữ": "U", "Ứ": "U", "Ự": "U", "Ỳ": "Y", "Ỷ": "Y", "Ỹ": "Y", "Ý": "Y", "Ỵ": "Y"
};

let toFriendly = (originalString) => {
  if (originalString == null || originalString.length == 0) {
    return originalString;
  }
  //ELSE:
  var removedDuplicatedSpacesString = originalString.replace(/\s+/g, " ");
  var removedVietnameseCharsString = "";
  for (var idx = 0; idx < removedDuplicatedSpacesString.length; idx++) {
    var ch = removedDuplicatedSpacesString[idx];
    var alternativeChar = VIETNAMESE_N_ASCII_MAP[ch];
    if (alternativeChar != null) {
      removedVietnameseCharsString += alternativeChar;
    } else {
      removedVietnameseCharsString += ch;
    }
  }
  return removedVietnameseCharsString.toLowerCase()
  .replace(/[^0-9a-zA-Z]/g, "-")
  .replace(/\-+/g, "-");
};

/*let i18n = (path) => {
	return require('../i18n/' + config.language + '/' + path).default;
}8*/

export default {
  isEmpty,
  toPretty,
	format,
	//i18n,
	toFriendly
}
