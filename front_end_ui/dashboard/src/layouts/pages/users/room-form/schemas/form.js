/**
=========================================================
* Viện Dưỡng Lão An Nghỉ MUI - v3.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-pro-mui
* Copyright 2022 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

const form = {
  formId: "new-user-form",
  formField: {
    roomName: {
      name: "roomName",
      label: "room name",
      type: "text",
      placeholder: "eg. 1",
      errorMsg: "Room name is required.",
    },
    bedName: {
      name: "bedName",
      label: "bed name",
      type: "text",
      placeholder: "eg. 1",
      errorMsg: "bed name is required.",
    }
    ,
    status: {
      name: "status",
      label: "status",
      type: "text",
      placeholder: "eg. 1",
      errorMsg: "status is required.",
    },
    company: {
      name: "company",
      label: "company",
      type: "text",
      placeholder: "eg. Creative Tim",
    },
    email: {
      name: "email",
      label: "email address",
      type: "email",
      placeholder: "eg. soft@dashboard.come",
      errorMsg: "Email address is required.",
      invalidMsg: "Your email address is invalid",
    },
    password: {
      name: "password",
      label: "password",
      type: "password",
      placeholder: "******",
      errorMsg: "Password is required.",
      invalidMsg: "Your password should be more than 6 characters.",
    },
    repeatPassword: {
      name: "repeatPassword",
      label: "repeat password",
      type: "password",
      placeholder: "******",
      errorMsg: "Password is required.",
      invalidMsg: "Your password doesn't match.",
    },
    address1: {
      name: "address1",
      label: "address 1",
      type: "text",
      placeholder: "eg. Street 111",
      errorMsg: "Address is required.",
    },
    address2: {
      name: "address2",
      label: "address 2",
      type: "text",
      placeholder: "eg. Street 221",
    },
    city: {
      name: "city",
      label: "city",
      type: "text",
      placeholder: "eg. Tokyo",
      errorMsg: "City is required.",
    },
    zip: {
      name: "zip",
      label: "zip",
      type: "number",
      placeholder: "7 letters",
      errorMsg: "Zip is required.",
      invalidMsg: "Zipcode is not valie (e.g. 70000).",
    },
    twitter: {
      name: "twitter",
      label: "twitter handle",
      type: "text",
      placeholder: "@soft",
      errorMsg: "Twitter profile is required.",
    },
    facebook: {
      name: "facebook",
      label: "facebook account",
      type: "text",
      placeholder: "https://...",
    },
    instagram: {
      name: "instagram",
      label: "instagram account",
      type: "text",
      placeholder: "https://...",
    },
    publicEmail: {
      name: "publicEmail",
      label: "public email",
      type: "email",
      placeholder: "Use an address you don't use frequently",
    },
    bio: {
      name: "bio",
      label: "bio",
      placeholder: "Say a few words about who you are or what you're working on.",
    },
  },
};

export default form;
