import { plainToInstance } from "class-transformer";
import { IsNotEmpty, IsOptional, IsString, validateOrReject } from "class-validator";
import { Request, Response, Router } from "express";
import { AppDataSource } from "../data-source";
import { Admin } from "../entity/Admin.entity";
import { Training } from "../entity/Training.entity";

const router_test = Router();
const router = router_test;

router.post('/', async (req: Request, res: Response) => {
  try {
    const dto: DTO = plainToInstance(DTO, { ...req.query, ...req.params, ...req.body, ...res.locals });
    try {
      await validateOrReject(dto);
    } catch (err_validation: any) {
      res.status(400).end(err_validation.toString());
      return;
    }
    
    res.json(await AppDataSource.getRepository(Training).findOne({
      where: {},
      relations: [
        'category',
        'trainer',
        'cooperation',
        'collaboration',
        'client',
        'list_training_chapter_training',
        'list_training_chapter_training.list_training_section_training_chapter'
      ]
    }));
    // res.json(await AppDataSource.query(dto.query));
  } catch (err: any) {
    res.status(500).end(err.toString());
  }
});

export { router_test };

class DTO {
  @IsString()
  @IsOptional()
  query?: string;
}
