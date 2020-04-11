import express, {Request, Response} from "express";
export const router = express.Router();
import {
    User,
    Event,
    Enrollment,
    Stat,
    StatCategory,
    Achievement,
    AchievementEarned
} from "../../db/models"
import {sequelize} from "../../db"
import {Op} from "sequelize";

const getEnrollments = async(req : Request, res : Response) => {
    const {user_id} = req.params;

    console.log(`Getting enrollments - user_id: ${user_id}`)
    try {
        const user = await sequelize
            .sync()
            .then(() => User.findAll({
                where: {
                    id: user_id
                },
                include: [Event]
            }));
        if (user.length > 0) {
            res.send({
                statusCode: 200,
                body: JSON.stringify(user[0].events)
            });
        } else {
            res.send({statusCode: 200, body: []});
        }
    } catch (err) {
        console.log(`Failed to get enrollments - user_id: ${user_id} - ${err.message}`)
        res.send({
            statusCode: err.statusCode || 500,
            headers: {
                'Content-Type': 'text/plain'
            },
            body: err.message || 'Could not fetch the Enrollment.'
        })
    }
}

const getAttendedEvents = async(req : Request, res : Response) => {
    const {user_id} = req.params;

    console.log(`Getting attended events - user_id: ${user_id}`)
    try {
        const enrollments = await sequelize
            .sync()
            .then(() => Enrollment.findAll({
                where: {
                    volunteer_id: user_id,
                    attended: 1
                },
                include: [Event]
            }));

        res.send({
            statusCode: 200,
            body: JSON.stringify(enrollments.map(el => el.event))
        });
    } catch (err) {
        console.log(`Failed to get attended events for  - user_id: ${user_id} - ${err.message}`)
        res.send({
            statusCode: err.statusCode || 500,
            headers: {
                'Content-Type': 'text/plain'
            },
            body: err.message || 'Could not fetch the Enrollment.'
        })
    }
}

const addEnrollment = async(req : Request, res : Response) => {
    const {event_id, user_id} = req.body;

    console.log(`adding enrollments - user_id: ${user_id} - event_id: ${event_id}`)
    try {
        await sequelize
            .sync()
            .then(() => Enrollment.create({volunteer_id: user_id, event_id: event_id}));
        res.send({statusCode: 200, body: "Successfully added enrollment"});
    } catch (err) {
        console.log(`Failed to added enrollments - user_id: ${user_id} - ${err.message}`)
        res.send({
            statusCode: err.statusCode || 500,
            headers: {
                'Content-Type': 'text/plain'
            },
            body: err.message || 'Could not add the Enrollment.'
        })
    }
}
const processStatistics = async(event_id, user_id) => {
    // increase number of events attended findOrCreate is used because new users
    // will have no stats recorded
    const [user_stat2,
        created2] = await Stat.findOrCreate({
        where: {
            volunteer_id: user_id,
            stat_category_id: '2'
        }
    })
    user_stat2.quantity = user_stat2.quantity + 1
    await user_stat2.save()

    // increase number of hours worked
    const event = await Event.findOne({
        where: {
            id: event_id
        }
    })
    const [user_stat1,
        created1] = await Stat.findOrCreate({
        where: {
            volunteer_id: user_id,
            stat_category_id: '1'
        }
    })
    user_stat1.quantity = user_stat1.quantity + event.end_time - event.start_time
    await user_stat1.save()

    // increase number of organizations helped if haven't previously done so
    const user_organizations = new Set()
    user_organizations.add(event.organization_id)
    const all_attended = await Enrollment.findAll({
        where: {
            volunteer_id: user_id,
            attended: 1
        },
        include: [Event]
    })
    for (let i = 0; i < all_attended.length; i++) {
        user_organizations.add(all_attended[i].event.organization_id)
    }
    const [user_stat3,
        created3] = await Stat.findOrCreate({
        where: {
            volunteer_id: user_id,
            stat_category_id: '3'
        }
    })
    user_stat3.quantity = user_organizations.size
    await user_stat3.save()
    return [user_stat2.quantity, user_stat1.quantity, user_stat3.quantity]
}
const processAchievements = async(user_id, num_events, num_hours, num_organizations) => {
    // gets all achievements of the user now Op.or is sequelize's OR syntax for SQL
    // queries, Op.gte for greater than or equal
    const new_achieved = await Achievement.findAll({
        where: {
            [Op.or]: [
                {
                    stat_category_id: "2",
                    quantity: {
                        [Op.gte]: num_events
                    }
                }, {
                    stat_category_id: "1",
                    quantity: {
                        [Op.gte]: num_hours
                    }
                }, {
                    stat_category_id: "3",
                    quantity: {
                        [Op.gte]: num_organizations
                    }
                }
            ]
        }

    })
    for (let i = 0; i < new_achieved.length; i++) {
        // use findOrCreate, if user already has that achievement it just finds it if
        // user does not have that achievement it creates it
        await AchievementEarned.findOrCreate({
            where: {
                volunteer_id: user_id,
                achievement_id: new_achieved[i].id
            }

        })
    }

}
const addAttendance = async(req : Request, res : Response) => {
    const {event_id, user_id} = req.body;
    console.log(`attending event - user_id: ${user_id} - event_id: ${event_id}`)

    try {
        await sequelize.sync()
        // mark event as attended returning: true to return updated enrollment
        const enrolled = await Enrollment.findOne({
            where: {
                volunteer_id: user_id,
                event_id: event_id
            }
        })
        if (enrolled === null) {
            return res.send({statusCode: 500, body: "You are not enrolled in the event!"});
        } else if (enrolled.attended == 1) {
            return res.send({statusCode: 400, body: "Already attended the event!"});
        } else {
            enrolled.attended = 1
            await enrolled.save()
        }
        const [num_events,
            num_hours,
            num_organizations] = await processStatistics(event_id, user_id)
        await processAchievements(user_id, num_events, num_hours, num_organizations)
        return res.send({statusCode: 200, body: "Successfully attended event!"});
    } catch (err) {
        console.log(`Failed to attend event - user_id: ${user_id} - ${err.message}`)
        res.send({
            statusCode: err.statusCode || 500,
            headers: {
                'Content-Type': 'text/plain'
            },
            body: err.message || 'Could not attend event in Enrollment.'
        })
    }
}

router.post("/attended", addAttendance)
router.get("/attended/:user_id", getAttendedEvents)
router.get("/:user_id", getEnrollments)
router.post("/add", addEnrollment)
