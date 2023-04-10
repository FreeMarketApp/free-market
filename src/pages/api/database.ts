require('dotenv').config()
import { user } from "@prisma/client"
import { equal } from "assert"
import { prisma } from "../../../server/db-global"

async function getAllUsers() {
  return await prisma.user.findMany()
}

async function getUserInfo(username: string) {
  return await prisma.user.findFirst({where: {username: username}})
}

async function getAllSellers() {
  return await prisma.user.findMany(({where: {seller: true}, select: {
    email: true,
    username: true,
    firstname: true,
    lastname: true,
    phonenumber: true
  }}))
}

async function createNewUser(newUserReq: user) {
  return await prisma.user.create({
    data: {
      createddate: newUserReq.createddate,
      firstname: newUserReq.firstname,
      email: newUserReq.email,
      lastname: newUserReq.lastname,
      phonenumber: newUserReq.phonenumber,
      username: newUserReq.username,
      password: newUserReq.password,
      seller: newUserReq.seller,
    }
  })
}

export {
  getAllUsers,
  createNewUser,
  getUserInfo,
  getAllSellers
}