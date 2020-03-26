import {Table, Column, Model, DataType, AllowNull, ForeignKey, PrimaryKey, BelongsTo, Default, BelongsToMany} from 'sequelize-typescript';
import { emitKeypressEvents } from 'readline';
 


@Table
export class Volunteer extends Model<Volunteer>{
  @AllowNull(false)
  @Column
  first_name: string;
  @AllowNull(false)
  @Column
  last_name: string;
  @AllowNull(false)
  @Column
  email: string;
  @AllowNull(false)
  @Column
  password: string;
  @Column(DataType.TEXT)
  bio: string;
  // @Column
  // date_joined: Date;
  @Column
  profile_picture_UrL: string;

  @BelongsToMany(() => Event, () => Enrollment)
  events: Event[];
}

@Table
export class VolunteerAvailability extends Model<VolunteerAvailability>{

  @ForeignKey(() => Volunteer)
  @Column
  volunteer_id:number;
  @AllowNull(false)
  @Column
  day_of_week: string;
  @AllowNull(false)
  @Column(DataType.TIME)
  start_hour: Date;
  @AllowNull(false)
  @Column(DataType.TIME)
  end_hour: Date;
}

@Table
export class Organization extends Model<Organization>{
  @AllowNull(false)
  @Column
  organization_name: string;
  @Column(DataType.TEXT)
  bio: string;
  @Column
  organization_logo_url: string;
}

@Table
export class EventType extends Model<EventType>{
  @Column(DataType.TEXT)
  photo_url: string;
  @AllowNull(false)
  @Column
  text: string;
}

@Table
export class Stat extends Model<Stat>{
  @ForeignKey(()=>Volunteer)
  @Column
  volunteer_id:number;
  @ForeignKey(()=>StatCategory)
  @Column
  stat_category_id:number;
  @Default(0)
  @Column
  quantity:number;
}

@Table
export class StatCategory extends Model<StatCategory>{
  @Column(DataType.TEXT)
  photo_url: string;
  @Column
  text: string;
}

@Table
export class Event extends Model<Event>{
  @AllowNull(false)
  @Column
  name:string;
  @Column
  start_date:Date;
  @Column
  end_date: Date;
  @Column(DataType.TEXT)
  description: string;
  @Column(DataType.TEXT)
  location: string;
  @ForeignKey(() => EventType)
  @Column
  event_category_id:number;
  @Column(DataType.TEXT)
  photo_url: string;
  @ForeignKey(() => Organization)
  @Column
  organization_id: number;
  @Column
  duration:number;
  @BelongsToMany(() => Volunteer, () => Enrollment)
  volunteers: Volunteer[];
}

@Table
export class VolunteerEventPreference extends Model<VolunteerEventPreference>{
  @ForeignKey(() => Volunteer)
  @PrimaryKey
  @Column
  volunteer_id: number;
  @ForeignKey(() => Event)
  @PrimaryKey
  @Column
  event_type_id:number;
}
@Table
export class Achievement extends Model<Achievement>{
  @Column(DataType.TEXT)
  photo_url: string;
  @Column
  text: string;
  @Default(0)
  @Column
  quantity: number
}
@Table
export class AchievementEarned extends Model<AchievementEarned>{
  @ForeignKey(() => Volunteer)
  @PrimaryKey
  @Column
  volunteer_id: number;
  @ForeignKey(() => Achievement)
  @PrimaryKey
  @Column
  achievement_id: number;

}

@Table
export class Enrollment extends Model<Enrollment>{
  //TODO implement the cascade option
  // @BelongsTo(()=>Volunteer,{
  //   onDelete: "CASCADE"
  // })
  @ForeignKey(() => Volunteer)
  @PrimaryKey
  @Column
  volunteer_id: number;


  @ForeignKey(() => Event)
  @PrimaryKey
  @Column
  event_id:number;

}
