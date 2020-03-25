import {Table, Column, Model, DataType} from 'sequelize-typescript';
import { Col } from 'sequelize/types/lib/utils';
 
@Table
class Person extends Model<Person> {
 
  @Column
  name: string;
 
  @Column
  age: number;

}

@Table
class Volunteer extends Model<Volunteer>{
  @Column
  name: string;
  @Column
  email: string;
  @Column
  password: string;
  // @Column(DataType.TEXT)
  // bio: string;
  // @Column
  // date_joined: Date;
  @Column
  profile_picture_UrL: string;
}

export {Person, Volunteer}