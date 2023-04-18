require('dotenv').config()
import { menu_items, user } from "@prisma/client"
import { equal } from "assert"
import { prisma } from "../../../server/db-global"

async function getAllUsers() {
  return await prisma.user.findMany()
}

async function getUserInfo(username: string) {
  return await prisma.user.findFirst({where: {username: username}, include: {user_store: true}})
}

async function getMenuItemById(item_id: number) {
  return await prisma.menu_items.findFirst({where: {id: item_id}});
}

async function getAllMenuItems(user_store_id: number) {
  return await prisma.user_store.findFirst({where: {id: user_store_id}, include: {menu_items: true}})
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

async function createUserStore(user_id: number) {
  return await prisma.user_store.create({
    data: {
      user_id: user_id
    }
  })
}

async function createMenuItem(item: menu_items) {
  return await prisma.menu_items.create({
    data: {
      item_name: item.item_name,
      item_price: item.item_price,
      item_photo: item.item_photo,
      user_store_id: item.user_store_id
    }
  })
}

async function updateMenuItemPhoto(item_photo: string, item_id: number) {
  return await prisma.menu_items.update({
    data: {
      item_photo: item_photo
    }, where: {
      id: item_id
    }
  })
}

async function updateMenuItemDetails(item: menu_items) {
  await prisma.menu_items.update({
    data: {
      item_name: item.item_name,
      item_price: item.item_price
    }, where: {
      id: item.id
    }
  })
  if (item.item_photo !== null) {
    await updateMenuItemPhoto(item.item_photo, item.id);
  }
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
  updateUserProfileImg,
  createUserStore,
  updateMenuItemDetails,
  createMenuItem,
  updateMenuItemPhoto,
  getMenuItemById,
  getAllMenuItems
}