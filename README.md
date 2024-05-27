## SuperSix Sports Hackathon - CSV UPLOADER SERVICE

## Table of Contents
- [Tech Stack](#tech-stack)
- [Features](#features)
  - [CSV Upload Service](#csv-upload-service)
  - [Data Display and Pagination](#data-display-and-pagination)
  - [Subscription Pricing Calculator](#subscription-pricing-calculator)
- [Running on Local Machine](#running-on-local-machine)
  - [Prerequisites](#prerequisites)
  - [Clone the repository](#clone-the-repository)
  - [Install Dependencies](#install-dependencies)
  - [Start the backend server](#start-the-backend-server)
  - [Start the dev environment](#start-the-dev-environment)

- [Additional Information](#additional-information)
- [Demo](#demo)
- [Conclusion](#conclusion)
  
## Introduction

a web application that leverages CSV data for both display and functionality. The application should be capable of handling large datasets efficiently, provide real-time feedback during uploads, and offer a seamless user experience.  

![Screenshot (399)](https://github.com/khushi0704/superSix_Hackathon/assets/64957861/19b419f4-7e43-4e9e-9ef1-8da0c18278aa)


## Tech Stack
 - **Frontend:** ReactJS , TailWindCSS
 - **Backend:** Node JS, Express JS

## Features
1. **CSV Upload Service:**
   - a feature allowing users to upload CSV files.
   - Ensures that the service efficiently handles large datasets.
   - Implementing real-time progress indicators to keep users informed during uploads.

2. **Data Display and Pagination:**
   - Displays the uploaded data on the UI post-upload completion.
   - Implemented pagination for smooth navigation through large datasets.
   - Ensures that the UI remains responsive even with extensive data.

![Pagination](https://github.com/khushi0704/superSix_Hackathon/assets/64957861/86849ea6-ff1d-4d07-9462-626439882ff8)

3. **Subscription Pricing Calculator:**
   - Utilized the uploaded CSV data to develop a Subscription Pricing Calculator.
   - Calculates and displays subscription pricing based on the uploaded data.
     
![Screenshot (402)](https://github.com/khushi0704/superSix_Hackathon/assets/64957861/dd2bcb54-712e-4f8e-acfc-ff805412bf43)


## Running on Local Machine

If you want to run this project on your local machine, please note the following:

### Prerequisites
 - Node JS (12.x and above)
 - React JS
 - TailWind CSS
  
### Clone the repository

```bash
git clone https://github.com/khushi0704/superSix_Hackathon
cd superSix_Hackathon
```

### Install Dependencies
```bash
npm install
```

### Start the backend server
```bash
nodemon server.js
```
### Start the dev environment
```bash
npm start
```

Wait for a few seconds for the program to compile. Once done, open **http://localhost:3000/** on your machine to browse the website.

### Additional Information
 - Ensure that the CSV file follows the correct format for successful parsing (e.g., comma-separated values).
 - Pagination buttons are disabled when there is no data to display or only one page of data.
 - Error messages will be displayed if there are issues with file upload or data parsing.
 - For support or feedback, contact khushi.jain0704@gmail.com

## Demo 

https://github.com/khushi0704/superSix_Hackathon/assets/64957861/a693bda7-3189-49e1-920f-ebdca98d2b35

## Conclusion:
Thank you for using the CSV Uploader Service! We hope this application simplifies the process of uploading and parsing CSV files for your needs. 
