if (typeof(Typist) == 'undefined') { Typist = {}; }


Typist.Lessons = {

	//-------------------------------------------------------------------------

	'data': [
/*
		{
			'title':	"random sentences",
			'tests':	['The brown Fox jumped over the lazy dog']
		},
*/
		{
			'title':	"left  hand - central row",
			'tests':	['adad', 'asas', 'fasa', 'dafa', 'safa', 'afsd', 'sadf']
		},
		{
			'title':	"left  hand - central row extended",
			'tests':	['adag', 'gadf', 'dags', 'gags', 'gada', 'sgad', 'gaga']
		},
		{
			'title':	"right hand - central row (without semicolon)",
			'tests':	['ljlj', 'lkjl', 'lkkj', 'ljjl', 'jkll', 'jjkk', 'llkk']
		},
		{
			'title':	"right hand - central row extended (without semicolon)",
			'tests':	['ljhk', 'hjkl', 'lkjh', 'hhjj', 'kljh', 'kklh', 'hjhj']
		}
	],

	//-------------------------------------------------------------------------

	'__lessons': null,
	
	//-------------------------------------------------------------------------

	'_lessons': function () {
		if (Typist.Lessons.__lessons == null) {
			var lessons;
			var	i,c;
			
			lessons = {};
			
			c = Typist.Lessons.data.length;
			for (i=0; i<c; i++) {
				lessons[Typist.Lessons.data[i]['title']] = new Typist.Lesson(Typist.Lessons.data[i]);
			}
			
			Typist.Lessons.__lessons = lessons;
		}
		
		return Typist.Lessons.__lessons;
	},

	//-------------------------------------------------------------------------

	'lessons': function () {
		return MochiKit.Base.values(Typist.Lessons._lessons());
	},

	//-------------------------------------------------------------------------

	'lessonWithTitle': function (aTitle) {
		return Typist.Lessons._lessons()[aTitle];
	},
	
	//-------------------------------------------------------------------------
	'syntaxFix': 'syntaxFix'
};
