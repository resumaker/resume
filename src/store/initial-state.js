module.exports = {
    touched: false,
    isMobile: true,
    sidebarActive: true,
    jobsSidebarActive: false,
    
    mode: 'preview',
    direction: 'ltr',
    themeColor: '#5b4f96',

    sections: {
        experience: {
            order: 1,
            text: 'Experience',
        },
        projects: {
            order: 2,
            text: 'Projects',
        },
        skills: {
            order: 3,
            text: 'Skills',
        },
        education: {
            order: 4,
            text: 'Education',
        },
    },

    resume: {
        fullname: 'Jon London',
        role: 'Software Engineer',
        profilePicture: typeof window !== `undefined` ? `${window.location.origin}/profile.png` : '',
        summary: 'Highly focused technologist with a multidisciplinary skill set honed over 10+ years in the IT industry. I strive to build great products and can take an initial idea, tackle it from multiple angles and take it from something great to something incredible. With 10+ years of experience in various industries, I help tech startups from idea phase to high volumes. I design and build scalable solutions, implement internal processes that fit your organization, build teams that produce results.',

        contact: {
            phone: {
                value: '+972503215221',
                visible: true,
            },
            email: {
                value: 'resumakerme@gmail.com',
                visible: true,
            },
            website: {
                value: 'https://datayears.com',
                visible: true,
            },
            location: {
                value: 'Chicago, USA',
                visible: true,
            },
        },

        skills: [
            {
                title: 'General',
                type: 'percent',
                subskills: [
                    { name: 'Architecture', percent: 89 },
                    { name: 'Mobile/Web App Development', percent: 95 },
                    { name: 'Product Management', percent: 85 },
                    { name: 'Project Management', percent: 92 },
                    { name: 'Game Development', percent: 70 },
                    { name: 'Blockchain', percent: 85 },
                    { name: 'Dev Ops', percent: 81 },
                    { name: 'Backend Development', percent: 93 },
                    { name: 'Data Science', percent: 65 },
                    { name: 'Artificial Intelligence', percent: 70 },
                    { name: 'UX', percent: 80 },
                ],
            },
            {
                title: 'Languages',
                type: 'percent',
                subskills: [
                    { name: 'Javascript', percent: 96 },
                    { name: 'Java', percent: 82 },
                    { name: 'Python', percent: 85 },
                    { name: 'C#', percent: 74 },
                    { name: 'Solidity', percent: 85 },
                    { name: 'Dart', percent: 75 },
                    { name: 'Go', percent: 60 },
                ],
            },
            {
                title: 'Frameworks',
                type: 'tag',
                subskills: [
                    { name: 'React' },
                    { name: 'Flutter' },
                    { name: 'React Native' },
                    { name: 'Vue' },
                    { name: 'Spring' },
                    { name: 'Angular' },
                    { name: 'Electron' },
                    { name: 'Node' },
                    { name: 'Flask' },
                    { name: 'Express' },
                    { name: 'Koa' },
                    { name: 'Gatsby' },
                    { name: 'Apollo' },
                    { name: 'Django' },
                    { name: 'Next' },
                    { name: 'Amplify' },
                    { name: 'Pixi' },
                    { name: 'Phaser' },
                    { name: 'Feathers' },
                ],
            },
            {
                title: 'Software',
                type: 'tag',
                subskills: [
                    { name: 'Docker' },
                    { name: 'Jira' },
                    { name: 'Unity' },
                    { name: 'Godot' },
                    { name: 'Google Analytics' },
                ],
            },
            {
                title: 'Databases',
                type: 'tag',
                subskills: [
                    { name: 'Postgresql' },
                    { name: 'Mongodb' },
                    { name: 'Parse' },
                    { name: 'Firebase' },
                    { name: 'Elastic Search' },
                ],
            },
        ],

        education: [
            {
                institution: 'Middle East Technical University, Turkey',
                degree: 'Geological Engineering',
                start: '2013',
                end: '2006'
            },
            {
                institution: 'Gazi University, Turkey',
                degree: 'Industrial Engineering',
                start: '2002',
                end: '2006'
            },
        ],

        experience: [
            {
                role: 'Full Stack Tech Lead',
                company: 'Malaeb Limited',
                description: 'Malaeb is a group sports community and booking platform. I was managing all technical aspects of the product. I designed a new solution to improve the current platform, build and manage a new development team to migrate the new app. Implement better internal processes to increase productivity.',
                start: '01/11/2018',
                end: '01/09/2019'
            },
            {
                role: 'Full Stack Tech Lead',
                company: 'Solve Care',
                description: 'Solve care is a healthcare blockchain platform. I was responsible for the client side development team and architecture of the platform. I was also active in product management team.',
                start: '01/04/2018',
                end: '01/11/2018'
            },
            {
                role: 'Full Stack Lead Developer',
                company: 'Applied Blockchain',
                description: 'Applied Blockchain built blockchain applications for enterprises and startups. I built 4 full stack blockchain projects during my contract.',
                start: '01/10/2017',
                end: '01/04/2018'
            },
            {
                role: 'Full Stack Lead Developer',
                company: 'Dmapper',
                description: 'Worked as a lead full-stack developer for Cortex which is B2B audit automation software for Deloitte. I was responsible for the architecture and development of the platform, managing development team.',
                start: '01/12/2016',
                end: '01/10/2017'
            },
            {
                role: 'Front End Developer - UI/UX Designer',
                company: 'GovRight',
                description: 'GovRight provides citizens the opportunity to understand and contribute to government and legislation. I was responsible for the UX and development of admin interface for the platform.',
                start: '01/11/2015',
                end: '01/04/2016',
            },
            {
                role: 'Full Stack Developer',
                company: 'Freelance',
                description: 'In the first years of my career, I had the privilege to work with many startups and building my own games and applications.',
                start: '01/04/2008',
                end: '01/01/2016',
            },
        ],

        // social: [
        //     {
        //     service: 'youtube',
        //     url: 'https://www.youtube.com/channel/UCczRc31u_YXNiSpYKxQU_Ug'
        //     },
        //     {
        //     service: 'linkedin',
        //     url: 'https://www.linkedin.com/in/barancezayirli'
        //     },
        //     {
        //     service: 'twitter',
        //     url: 'https://twitter.com/barancezayirli'
        //     },
        //     {
        //     service: 'angellist',
        //     url: 'https://angel.co/baran-cezayirli'
        //     },
        //     {
        //     service: 'github',
        //     url: 'https://github.com/barancezayirli'
        //     },
        //     {
        //     service: 'facebook',
        //     url: 'https://www.facebook.com/barancezayirli'
        //     },
        //     {
        //     service: 'instagram',
        //     url: 'https://www.instagram.com/barancezayirli'
        //     }
        // ],

        projects: [
            {
                name: 'Super Launch',
                company: 'Super Launch Inc.',
                description: 'The fastest way to build a professional landing page to showcase your app.',
                link: 'https://superlaunch.app',
            },     
            {
                name: 'Resumaker',
                company: 'Open source',
                description: 'An online free, beatufully designed template for creating professional, customisable resumes.',
                link: 'https://resumaker.me',
            },
            {
                name: 'Datayears',
                company: 'Personal',
                description: 'A website showcasing and analaysing specific topics on a variety of categories.',
                link: 'https://datayears.com',
            },
        ],
    },
};  