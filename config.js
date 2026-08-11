/*==================================================
    CHS CLASS TRACKER 3
    CONFIGURATION
==================================================*/

const CONFIG = {

    /*==============================================
        School Information
        --------------------------------------------
        These values will eventually be editable
        through the teacher configuration screen.
    ==============================================*/

    school: {

        name: "Chico High School",

        shortName: "CHS",

        department: "CTE Engineering & Architecture"

    },


    /*==============================================
        Teacher Information
        --------------------------------------------
        This will eventually be configurable for
        each teacher using the application.
    ==============================================*/

    teacher: {

        name: "Gavin Cockrell"

    },


    /*==============================================
        Dashboard Information
    ==============================================*/

    dashboard: {

        title: "CHS CLASS TRACKER",

        subtitle: "Engineering • Architecture • Chico High School"

    },


    /*==============================================
        Dashboard Settings
    ==============================================*/

    maxPoints: 300,


    /*==============================================
        Class Information
    ==============================================*/

    classes: [

        {
            id: 0,
            day: "gold",
            period: "Gold 1",
            short: "ENG 2",
            name: "Engineering 2",
            color: "#18D8FF"
        },

        {
            id: 1,
            day: "gold",
            period: "Gold 2",
            short: "ENG 3-4",
            name: "Engineering 3-4",
            color: "#00E676"
        },

        {
            id: 2,
            day: "gold",
            period: "Gold 4",
            short: "ARCH 1",
            name: "Architecture 1",
            color: "#FFD54F"
        },

        {
            id: 3,
            day: "red",
            period: "Red 1",
            short: "ENG 1A",
            name: "Engineering 1A",
            color: "#FF7043"
        },

        {
            id: 4,
            day: "red",
            period: "Red 2",
            short: "ENG 1B",
            name: "Engineering 1B",
            color: "#AB47BC"
        },

        {
            id: 5,
            day: "red",
            period: "Red 3",
            short: "ARCH 2-4",
            name: "Architecture 2-4",
            color: "#42A5F5"
        }

    ],


    /*==============================================
        Reward Milestones
    ==============================================*/

    rewards: [

        {
            points: 75,
            name: "🎧 Headphones While Working"
        },

        {
            points: 150,
            name: "🎵 Student DJ"
        },

        {
            points: 225,
            name: "🎁 Mystery Reward"
        },

        {
            points: 300,
            name: "🎉 FREE FRIDAY"
        }

    ],


    /*==============================================
        Construction Progress
    ==============================================*/

    stages: [

        {
            points: 0,
            name: "📐 Planning"
        },

        {
            points: 25,
            name: "🚧 Site Preparation"
        },

        {
            points: 75,
            name: "🧱 Foundation Complete"
        },

        {
            points: 100,
            name: "🏗 Structural Framing"
        },

        {
            points: 150,
            name: "🔩 Steel Installation"
        },

        {
            points: 200,
            name: "⚡ Electrical & Plumbing"
        },

        {
            points: 250,
            name: "🪟 Interior Finishing"
        },

        {
            points: 300,
            name: "🏆 Ribbon Cutting!"
        }

    ],


    /*==============================================
        Bell Schedules
    ==============================================*/

    schedules: {

        regular: {

            gold: [
                { start: "08:30", end: "09:58", classId: 0 },
                { start: "10:13", end: "11:41", classId: 1 },
                { start: "11:41", end: "12:27", type: "Lunch" },
                { start: "12:27", end: "01:55", classId: 2 },
                { start: "02:02", end: "03:30", type: "Prep" }
            ],

            red: [
                { start: "08:30", end: "09:58", classId: 3 },
                { start: "10:13", end: "11:41", classId: 4 },
                { start: "11:41", end: "12:27", type: "Lunch" },
                { start: "12:27", end: "01:55", classId: 5 },
                { start: "02:02", end: "03:30", type: "Prep" }
            ]

        },


        wednesday: {

            gold: [
                { start: "09:00", end: "10:21", classId: 0 },
                { start: "10:33", end: "11:54", classId: 1 },
                { start: "11:54", end: "12:41", type: "Lunch" },
                { start: "12:41", end: "02:02", classId: 2 },
                { start: "02:09", end: "03:30", type: "Prep" }
            ],

            red: [
                { start: "09:00", end: "10:21", classId: 3 },
                { start: "10:33", end: "11:54", classId: 4 },
                { start: "11:54", end: "12:41", type: "Lunch" },
                { start: "12:41", end: "02:02", classId: 5 },
                { start: "02:09", end: "03:30", type: "Prep" }
            ]

        },


        dwsd: {

            gold: [
                { start: "08:30", end: "09:31", classId: 0 },
                { start: "09:37", end: "10:38", classId: 1 },
                { start: "10:49", end: "11:50", classId: 2 },
                { start: "11:56", end: "03:30", type: "Prep" }
            ],

            red: [
                { start: "08:30", end: "09:31", classId: 3 },
                { start: "09:37", end: "10:38", classId: 4 },
                { start: "10:49", end: "11:50", classId: 5 },
                { start: "11:56", end: "03:30", type: "Prep" }
            ]

        }

    }

};
