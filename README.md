# ReEngine-IT
![ReEngine-IT](https://github.com/Grumpyyash/ReEngine-IT-MERN/blob/main/repic.png)

## The Idea
This application is just inspired by some regular activities that happen every year in our college. The purchase and sell of only once used labcoats for chemistry practicals and drafters and drawing kit for Engineering design. This website provides an easy and intercative interface for buyers and sellers to communicate and have a smooth "bussiness" over the application. However this has not been limited to only drafters and lab coats but it is also extended to many electrical and other technical appliances.

## Technologies used
The front-end part is built using **HTML** and **EJS** templates which have been styled using conventional **CSS**, **Bootstrap**, **MDBootstrap**, **Material-UI**. The server side part and most of the logistics have been implemented using **NodeJS(Express)** and the database used is **MongoDB** using **Mongoose**.

## Working
The working principal of the website is simple yet effecient. If you are a buyer, explore through the homepage, different categories and even search the product you are seeking for, you will be able to get a complete information about the product, seller and will even have the facility to call or have a chat over mail with the seller.
If you don't get the desired product, you can even register a demand which will be stored in our database and from there sellers can contact you.
If you are a seller, just fill in all the details and post your product and then leave everything up to us. Yo can even track the progress of your product in the products section.

## Forthcoming
There is always a scope of improvement in everything including this project as well. New and updated version of this project is firmly on its way which would contain features like Authentication and access to your media files to upload them easily. Also working on including maps in the address section. Hang on!!

## Visit Online

This website is hosted at [https://sleepy-retreat-60004.herokuapp.com/](https://sleepy-retreat-60004.herokuapp.com/)


## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

Your machine should have Npm(or Yarn), Node.js, and MongoDB installed to use it locally.

## Setup and Installation

### Setting up the repository locally

1. First fork the repo to your account.  
   Go to the forked repo and clone it to your local machine:

```sh
git clone https://github.com/<your_username>/ReEngine-IT-MERN.git
```

This will make a copy of the code to your local machine.

2. Now move to the `ReEngine-IT-MERN` directory.

```sh
cd ReEngine-IT-MERN
```

3. Now check the remote of your local code by:

```sh
git remote -v
```

The response should look like:

```sh
origin	https://github.com/<username>/ReEngine-IT-MERN.git (fetch)
origin	https://github.com/<username>/ReEngine-IT-MERN.git (push)
```

To add upstream to remote, run:

```sh
git remote add upstream https://github.com/Grumpyyash/ReEngine-IT-MERN.git
```

Again run `git remote -v`, the response should look like:

```sh
origin	https://github.com/<username>/ReEngine-IT-MERN.git (fetch)
origin	https://github.com/<username>/ReEngine-IT-MERN.git (push)
upstream	https://github.com/Grumpyyash/ReEngine-IT-MERN.git (fetch)
upstream	https://github.com/Grumpyyash/ReEngine-IT-MERN.git (push)
```

4. Once the remote is set, install all the necessary dependencies by the following command:

```sh
npm install
```
### Run locally

Run the below command to start the server:

```sh
npm start
```
Go to: [http://localhost:3000](http://localhost:4000)
