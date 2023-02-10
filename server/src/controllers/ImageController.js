import multer from 'multer';
import multerConfig from '../config/multerConfig';
import Image from '../models/Image';

const upload = multer(multerConfig).single('image');

class IamgeController {
  store(req, res) {
    return upload(req, res, async (error) => {
      if (error) {
        return res.status(400).json({
          errors: [error.code],
        });
      }

      const { originalname, filename } = req.file;
      const { user_id } = req.body;
      const image = await Image.create({ originalname, filename, user_id });

      return res.json(image);
    });
  }
}

export default new IamgeController();
