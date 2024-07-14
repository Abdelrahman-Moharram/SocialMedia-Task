
# Intro
This web app is a small task that enables users to follow others and view their content with a real-time notification system. Users can also view profiles containing posts and data.

# Technologies
In this Task I build 
- Backend
  - Django
  - Django Rest Framework
  - Djoser and Simple_Jwt (for refresh-token authentications)
- Frontend
  - Next.Js
  - TypeScript
  - Redux
  - RTK Query
  - Tailwind CSS

# Installation
- Install Python >= 3.11 on your machine
- install node.js >= 18 runtime in your local machine
- I used sqlite3 as a main db to easily use the data I already added for the demo
- open the backend dir in your cmd and run the next command
```
  pip install -r requirements.txt
``` 
- then run the server using the next command
```
  python manage.py runserver
```
- open a new terminal in your frontend folder
- run the next command to install the required dependencies
```
  npm i
```
- and then run the next command to run the frontend server
```
  npm run dev
```
- go to http://localhost:3000/ the running server 



The next video demonstrates how the notification system functions

https://github.com/user-attachments/assets/2c6b2e2a-ad8f-40e6-a1e1-98769158e95b


and this one shows that when a user follows you, their posts appear in your home page

https://github.com/user-attachments/assets/09caa55d-8315-45e7-914f-44842a4baa90

