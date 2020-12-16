const sql = require('mssql/msnodesqlv8');

const config = {
    user: 'sa',
    password: '123',
    server: 'localhost',
    options: {
        database: 'node',
        encrypt: false,
        "enableArithAbort": true
    }
};

const resolver = {
    getFaculties: (args, context) => {
        return  (args.FACULTY) ? context.getFaculty(args, context) : context.getFaculties(args, context);
    },

    getPulpits: (args, context) => {
        return  (args.PULPIT) ?context.getPulpit(args, context) : context.getPulpits(args, context);
    },

    getSubjects: (args, context) => {
        return  (args.SUBJECT) ? context.getSubject(args, context) : context.getSubjects(args, context);
    },

    getTeachers: (args, context) => {
        return  (args.TEACHER) ? context.getTeacher(args, context) : context.getTeachers(args, context);
    },

    setFaculty: async (args, context) => {
        let res = await context.updateFaculty(args, context);
        return (res == null) ? context.insertFaculty(args, context) : res;
    },

    setPulpit: async (args, context) => {
        let res = await context.updatePulpit(args, context);
        return  (res == null) ? context.insertPulpit(args, context) : res;
    },

    setSubject: async (args, context) => {
        let res = await context.updateSubject(args, context);
        return  (res == null) ? context.insertSubject(args, context) : res;
    },

    setTeacher: async (args, context) => {
        let res = await context.updateTeacher(args, context);
        return (res == null) ? context.insertTeacher(args, context) : res;
    },

    delFaculty: (args, context) => context.delFaculty(args, context),
    delPulpit: (args, context) => context.delPulpit(args, context),
    delSubject: (args, context) => context.delSubject(args, context),
    delTeacher: (args, context) => context.delTeacher(args, context),
    getTeachersByFaculty: (args, context) => context.getTeachersByFaculty(args, context),
    getSubjectsByFaculties: (args, context) => context.getSubjectsByFaculties(args, context)
};




function DB (cb) {
    this.getFaculties = (args, context) => {
        return (new sql.Request())
            .query('use node;select * from FACULTY')
            .then((r) => { return r.recordset });
    };

    this.getPulpits = (args, context) => {
        return (new sql.Request())
            .query('use node;select * from PULPIT')
            .then((r) => { return r.recordset; });
    };

    this.getSubjects = (args, context) => {
        return (new sql.Request())
            .query('use node;select * from SUBJECT')
            .then((r) => { return r.recordset; });
    };

    this.getTeachers = (args, context) => {
        return (new sql.Request())
            .query('use node;select * from TEACHER')
            .then((r) => { return r.recordset; });
    };

    this.getFaculty = (args, context) => {
        return (new sql.Request())
            .input('f', sql.NVarChar, args.FACULTY)
            .query('use node;select top(1) * from FACULTY where FACULTY = @f')
            .then((r) => { return r.recordset; });
    };

    this.getPulpit = (args, context) => {
        return (new sql.Request())
            .input('p', sql.NVarChar, args.PULPIT)
            .query('use node;select top(1) * from PULPIT where PULPIT = @p')
            .then((r) => { return r.recordset; });
    };

    this.getSubject = (args, context) => {
        return (new sql.Request())
            .input('s', sql.NVarChar, args.SUBJECT)
            .query('use node;select top(1) * from SUBJECT where SUBJECT = @s')
            .then((r) => { return r.recordset; });
    };

    this.getTeacher = (args, context) => {
        return (new sql.Request())
            .input('t', sql.NVarChar, args.TEACHER)
            .query('use node;select top(1) * from TEACHER where TEACHER = @t')
            .then((r) => { return r.recordset; });
    };

    this.delFaculty = (args, context) => {
        return (new sql.Request())
            .input('f', sql.NVarChar, args.FACULTY)
            .query('use node;delete from FACULTY where FACULTY = @f')
            .then((r) => {
                return r.rowsAffected[0] !== 0;
            });
    };

    this.delPulpit = (args, context) => {
        return (new sql.Request())
            .input('p', sql.NVarChar, args.PULPIT)
            .query('use node;delete from PULPIT where PULPIT = @p')
            .then((r) => {
                return r.rowsAffected[0] !== 0;
            });
    };

    this.delSubject = (args, context) => {
        return (new sql.Request())
            .input('s', sql.NVarChar, args.SUBJECT)
            .query('use node;delete from SUBJECT where SUBJECT = @s')
            .then((r) => {
                return (r.rowsAffected[0] === 0) ? null : args;
            });
    };

    this.delTeacher = (args, context) => {
        return (new sql.Request())
            .input('t', sql.NVarChar, args.TEACHER)
            .query('use node;delete from TEACHER where TEACHER = @t')
            .then((r) => {
                return r.rowsAffected[0] !== 0;
            });
    };

    this.insertFaculty = (args, context) => {
        return (new sql.Request())
            .input('a', sql.NVarChar, args.FACULTY)
            .input('b', sql.NVarChar, args.FACULTY_NAME)
            .query('use node;insert FACULTY(FACULTY, FACULTY_NAME) values (@a, @b)')
            .then((r) => {return args});
    };

    this.insertPulpit = (args, context) => {
        return (new sql.Request())
            .input('a', sql.NVarChar, args.PULPIT)
            .input('b', sql.NVarChar, args.PULPIT_NAME)
            .input('c', sql.NVarChar, args.FACULTY)
            .query('use node;insert PULPIT(PULPIT, PULPIT_NAME, FACULTY) values (@a, @b, @c)')
            .then((r) => { return args });
    };

    this.insertSubject = (args, context) => {
        return (new sql.Request())
            .input('a', sql.NVarChar, args.SUBJECT)
            .input('b', sql.NVarChar, args.SUBJECT_NAME)
            .input('c', sql.NVarChar, args.PULPIT)
            .query('use node;insert SUBJECT(SUBJECT, SUBJECT_NAME, PULPIT) values (@a, @b, @c)')
            .then((r) => { return args });
    };

    this.insertTeacher = (args, context) => {
        return (new sql.Request())
            .input('a', sql.NVarChar, args.TEACHER)
            .input('b', sql.NVarChar, args.TEACHER_NAME)
            .input('c', sql.NVarChar, args.PULPIT)
            .query('use node;insert teacher(TEACHER, TEACHER_NAME, PULPIT) values (@a, @b, @c)')
            .then((r) => { return args });
    };

    this.updateFaculty = (args, context) => {
        return (new sql.Request())
            .input('a', sql.NVarChar, args.FACULTY)
            .input('b', sql.NVarChar, args.FACULTY_NAME)
            .query('use node;update FACULTY set FACULTY = @a, FACULTY_NAME = @b where FACULTY = @a')
            .then((r) => {
                return (r.rowsAffected[0] === 0) ? null : args;
            });
    };

    this.updatePulpit = (args, context) => {
        return (new sql.Request())
            .input('a', sql.NVarChar, args.PULPIT)
            .input('b', sql.NVarChar, args.PULPIT_NAME)
            .input('c', sql.NVarChar, args.FACULTY)
            .query('use node;update PULPIT set PULPIT = @a, PULPIT_NAME = @b, FACULTY = @c where PULPIT = @a')
            .then((r) => {
                return (r.rowsAffected[0] === 0) ? null : args;
            });
    };

    this.updateSubject = (args, context) => {
        return (new sql.Request())
            .input('a', sql.NVarChar, args.SUBJECT)
            .input('b', sql.NVarChar, args.SUBJECT_NAME)
            .input('c', sql.NVarChar, args.PULPIT)
            .query('use node;update SUBJECT set SUBJECT = @a, SUBJECT_NAME = @b, PULPIT = @c where SUBJECT = @a')
            .then((r) => {
                return(r.rowsAffected[0] === 0) ? null : args;
            });
    };

    this.updateTeacher = (args, context) => {
        return (new sql.Request())
            .input('a', sql.NVarChar, args.TEACHER)
            .input('b', sql.NVarChar, args.TEACHER_NAME)
            .input('c', sql.NVarChar, args.PULPIT)
            .query('use node;update TEACHER set TEACHER = @a, TEACHER_NAME = @b, PULPIT = @c where TEACHER = @a')
            .then((r) => {
                return (r.rowsAffected[0] === 0) ? null : args;
            });
    };

    this.getTeachersByFaculty = (args, context) => {
        return (new sql.Request())
            .input('f', sql.NVarChar, args.FACULTY)
            .query('use node;select TEACHER.*, PULPIT.FACULTY from TEACHER ' +
                'inner join PULPIT on TEACHER.PULPIT = PULPIT.PULPIT ' +
                'inner join FACULTY on PULPIT.FACULTY = FACULTY.FACULTY where FACULTY.FACULTY = @f')
            .then((r) => {
                let zaps = (o) => {
                    return {TEACHER: o.TEACHER, TEACHER_NAME: o.TEACHER_NAME, PULPIT: o.PULPIT}
                };
                let zapp = (o) => {
                    return {FACULTY: o.FACULTY, TEACHERS: [zaps(o)]}
                };
                let rc = [];
                r.recordset.forEach((el, index) => {
                    if (index === 0)
                        rc.push(zapp(el));
                    else if (rc[rc.length - 1].FACULTY !== el.FACULTY)
                        rc.push(zapp(el));
                    else
                        rc[rc.length - 1].TEACHERS.push(zaps(el));
                });
                console.log(rc)
                return rc;
            })
    };

    this.getSubjectsByFaculties = (args, context) => {
        return (new sql.Request())
            .input('f', sql.NVarChar, args.FACULTY)
            .query('use node;select SUBJECT.*, PULPIT.PULPIT_NAME, PULPIT.FACULTY from SUBJECT ' +
                'inner join PULPIT on subject.PULPIT = PULPIT.PULPIT ' +
                'inner join FACULTY on PULPIT.FACULTY = FACULTY.FACULTY where FACULTY.FACULTY = @f')
            .then((r) => {
                let zaps = (o) => {return {SUBJECT: o.SUBJECT, SUBJECT_NAME: o.SUBJECT_NAME, PULPIT: o.PULPIT}};
                let zapp = (o) => {return {PULPIT: o.PULPIT, PULPIT_NAME: o.PULPIT_NAME, FACULTY: o.FACULTY, SUBJECTS:[zaps(o)]}};
                let rc = [];
                r.recordset.forEach((el, index) => {
                    if (index === 0)
                        rc.push(zapp(el));
                    else if (rc[rc.length - 1].PULPIT !== el.PULPIT)
                        rc.push(zapp(el));
                    else
                        rc[rc.length - 1].SUBJECTS.push(zaps(el));
                });
                console.log(rc)
                return rc;
            });
    };

    this.connect = sql.connect(config, err => {
        err ? cb(err, null) : cb(null, this.connect);
    });
}

//module.exports=DB = (cb) => { return new DB(cb) };
exports.DB = (cb) => { return new DB(cb) };
exports.resolver = resolver;