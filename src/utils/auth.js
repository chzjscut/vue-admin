import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'
const GroupId = 'GroupId'
const GeneralId = 'GeneralId'

const cacheCookies = {
	getToken() {
	  return Cookies.get(TokenKey)
	},

	setToken(token) {
	  return Cookies.set(TokenKey, token)
	},

	removeToken() {
	  return Cookies.remove(TokenKey)
	},

	getGroupId() {
	  return Cookies.get(GroupId)
	},

	setGroupId(groupid) {
	  return Cookies.set(GroupId, groupid)
	},

	removeGroupId() {
	  return Cookies.remove(GroupId)
	},

	getGeneralId() {
	  return Cookies.get(GeneralId)
	},

	setGeneralId(generalid) {
	  return Cookies.set(GeneralId, generalid)
	},

	removeGeneralId() {
	  return Cookies.remove(GeneralId)
	},

	getAccount() {
	  return Cookies.get('account_login')
	},

	setAccount(account) {
	  return Cookies.set('account_login', account)
	},

	removeAccount() {
	  return Cookies.remove('account_login')
	},

	getPassword() {
	  return Cookies.get('password_login')
	},

	setPassword(password) {
	  return Cookies.set('password_login', password)
	},

	removePassword() {
	  return Cookies.remove('password_login')
	},

	getName() {
	  return Cookies.get('name')
	},

	setName(name) {
	  return Cookies.set('name', name)
	},

	removeName() {
	  return Cookies.remove('name')
	},

	getAvatar() {
	  return Cookies.get('avatar')
	},

	setAvatar(icon) {
	  return Cookies.set('avatar', icon)
	},

	removeAvatar() {
	  return Cookies.remove('avatar')
	},

	getRememberLogin() {
	  return Cookies.get('remember_login')
	},

	setRememberLogin(isremember) {
	  return Cookies.set('remember_login', isremember)
	}
}

export default cacheCookies
