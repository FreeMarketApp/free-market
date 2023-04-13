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

async function updateUserProfileImg(username: string, profile_img: string) {
  return await prisma.user.update({where: {username: username}, data: {profile_img: profile_img}})
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
      profile_img: newUserReq.profile_img,
    }
  })
}

export {
  getAllUsers,
  createNewUser,
  getUserInfo,
  getAllSellers,
  updateUserProfileImg
}