const assert = require('assert')
const ApiError = require('../model/ApiError')
const Person = require('../model/Person')
const List = require('../model/List')
const auth = require('../util/auth/authentication')
const bcrypt = require('bcryptjs')

