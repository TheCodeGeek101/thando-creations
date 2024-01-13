import axios from 'axios';
import nc from 'next-connect';
import { isAuth } from '../../../utils/auth';

const handler = nc();

handler.use(isAuth);

handler.post(async (req, res) => {
  const projectId = 'fauat7no';
  const dataset = 'production';
  const tokenWithWriteAccess = "skJcbJaU4smMnbOfeDj9jjZBJTqkGUNUkPyVK8AgBLyd29xatGTJsDfw35uqBxR3Tjl8X43nJdCzAqierd7JImzGp3BoaBy4DGtPWNZo7lagCCbcQ8cEkDa6Hro4MBAN54fy4YVDn5nooiJtaxmhu89ecbeeIOKbImfk4vcByx2AbAeDXryK";
  const { data } = await axios.post(
    `https://${projectId}.api.sanity.io/v1/data/mutate/${dataset}`,
    {
      mutations: [
        {
          create: {
            _type: 'order',
            createdAt: new Date().toISOString(),
            ...req.body,
            userName: req.user.name,
            user: {
              _type: 'reference',
              _ref: req.user._id,
            },
          },
        },
      ],
    },
    {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${tokenWithWriteAccess}`,
      },
    }
  );

  res.status(201).send(data.results[0].id);
});
export default handler;