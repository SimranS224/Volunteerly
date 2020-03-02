// include all  user database calls and all functions here 

// generate random date for fake data
const randomDate = (start, end) => {
    let d = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime())),
        month = (d.getMonth() + 1).toString(),
        day = (d.getDate()).toString(),
        year = d.getFullYear();

    month = month.length < 2 ? '0' + month : month;
    day = day.length < 2 ? '0' + day : day;

	return [year, month, day].join('-');
}

//fake data
const data = [{user: 'admin', title: 'Beach Cleanup', desc: 'Clean the beach of ontario!',type:'Clean Up', date:randomDate(new Date(2020, 0, 1), new Date())}, 
{user: 'admin', title: 'Teach Art and Paint Murals', desc: 'Provide art classes to the youth and help with community painting projects', type:'Community Building', date:randomDate(new Date(2020, 0, 1), new Date())},
{user: 'admin', title: 'Teach English Classes', desc: 'Teach English to children and adults through short-term intensive classes', type:'Community Building', date:randomDate(new Date(2020, 0, 1), new Date())},
{user: 'admin', title: 'Provide Child-Care Support', desc: 'Work with young children and provide support to day-care staff',type:'Community Building', date:randomDate(new Date(2020, 0, 1), new Date())},
{user: 'admin', title: 'Support Manual Labor Projects', desc: 'Help paint homes and support basic manual labor tasks for local residents',type:'Community Building', date: randomDate(new Date(2020, 0, 1), new Date())},
{user: 'past', title: 'Clean the beaches', desc: 'Help clean the beach at Harbourfront', type:'Clean Up', date: randomDate(new Date(2020, 0, 1), new Date())},
{user: 'past', title: 'Clean the oceans', desc: 'Clean the Atlantic Ocean', type:'Clean Up', date: randomDate(new Date(2020, 0, 1), new Date())},
{user: 'past', title: 'Volunteer at SOS Autism', desc: 'Translate grant application documents', type:'Community Building', date: randomDate(new Date(2020, 0, 1), new Date())},
{user: 'future', title: 'Plant trees in HighGarden', desc: 'Bring a shovel!', type:'Planting', date: randomDate(new Date(2020, 0, 1), new Date())}
]

const getEvents = (user) => {
	for(let i = 0; i < data.length; i++){
		data[i].date = randomDate(new Date(2020, 0, 1), new Date())
	}
	if(user === null || user === undefined){
		// all events
		return data
	}else{
		// user specific events
		return data.filter(event => event.user === user)
	}
}

export const userService = {
	getEvents
}