import nc from 'next-connect';
import { isAuth } from '../../../utils/auth';

const handler = nc();
handler.use(isAuth);

const client_id = "ARYD2mpyhUG0UqTwomMjf8MIe8Ud1hKSbZB2j_k3vba8kg5SLmGzsLVaODzEjWDwALivCr52AphMAez5";

handler.get(async (req, res) => {
  res.send(client_id || 'sb');
});

export default handler;