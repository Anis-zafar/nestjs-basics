import { HttpException, HttpStatus } from '@nestjs/common';
import { diskStorage } from 'multer';
import { extname } from 'path';

// export class multeroptions ={
//     filefilter: (req: any, file: any, cb: any) => {
//         if (file.mimtype.match(/\/(jpg|jpeg|png|gif)$/)) {

//             cb(null, true);
//         }
//         else {
//             cb(new HttpException(`unsupported file type' ${extname(file.originalname)}`, HttpStatus.BAD_REQUEST), false);
//         }
//     },
//         Storage: diskStorage({

//         })
// }
