import nc from 'next-connect';
import bcrypt from 'bcryptjs';
import axios from 'axios';
import { signToken } from '../../../utils/Auth';
import client from '../../../utils/client'

const handler = nc();

handler.post(async (req, res) => {
  const projectId = 'fauat7no';
  const dataset = 'production';
  const tokenWithWriteAccess = process.env.NEXT_PRIVATE_SANITY_API_TOKEN;
  const data = {
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password),
  }
  // const createMutations = [
  //   {
  //     create: {
  //       _type: 'user',
  //       name: req.body.name,
  //       email: req.body.email,
  //       password: bcrypt.hashSync(req.body.password),
  //       isAdmin: false,
  //     },
  //   },
  // ];
  const existUser = await client.fetch(
    `*[_type == "user" && email == $email][0]`,
    {
      email: req.body.email,
    }
  );
  
  // check if the user exists
  if (existUser) {
    return res.status(401).send({ message: 'Email aleardy exists' });
  }
  // post data to sanity
   const response = await fetch(
            `https://${projectId}.api.sanity.io/v1/data/mutate/${dataset}`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${tokenWithWriteAccess}`,
              },
              body: JSON.stringify({
                mutations: [
                  {
                    create: {
                      _type: 'user', // Replace with your existing schema type "user"
                      // Map the data fields to the corresponding fields in your "tutor" schema
                      ...data, // Spread the tutorData object to include all fields
                    },
                  },
                ],
              }),
            }
          );
      if(response.ok){
          console.log( 4 + "User registered successfully");
          const userId = data.results[0].id;
          
          // check userId
          console.log(4 + "UserID:" + userId );

          const user = {
            _id: userId,
            name: req.body.name,
            email: req.body.email,
            isAdmin: false,
          };
          // check the user
          console.log(5 + "user: " + user);

          const token = signToken(user);
          res.send({ ...user, token });
      }
  // const { data } = await axios.post(
  //   `https://${projectId}.api.sanity.io/v1/data/mutate/${dataset}?returnIds=true`,
  //   { mutations: createMutations },
  //   {
  //     headers: {
  //       'Content-type': 'application/json',
  //       Authorization: `Bearer ${tokenWithWriteAccess}`,
  //     },
  //   }
  // );
  
});

export default handler;