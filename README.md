The application is an API used to resize images and serve it from Backend using node.js

To run the application unit testing using jasmine ==> npm run test

The application has a single endpint ==> /image

To start using the application run the server using ==> npm start

Then in browser use the following format in url:

==> localhost:3000/image?filename=example.jpg&width=num&height=num

Notes:
-- file extention .jpg only allowed
-- width & height must be integers only
-- available images names are ==> tiger.jpg - cat.jpg - landscape.jpg
