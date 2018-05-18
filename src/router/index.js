import Vue from 'vue'
import Router from 'vue-router'
import Load from '@/share/components/Load'
import Yuanxiao from '@/share/components/Yuanxiao'

import Teacher from '@/teacher/components/Teacher'
import Shixun from '@/teacher/components/Shixun'
import Renwu from '@/teacher/components/Renwu'
import Shuju from '@/teacher/components/Shuju'
import Ability from '@/teacher/components/Ability'
import Ziliao from '@/teacher/components/Ziliao'
import Geren from '@/teacher/components/Geren'
import Course from '@/teacher/components/Course'
import addProblemSet from '@/teacher/components/addProblemSet'
import addProblem from '@/teacher/components/addProblem'
import editProblem from '@/teacher/components/editProblem'
import allTrueCase from '@/teacher/components/allTrueCase'
import pubMission from '@/teacher/components/pubMission'

import Student from '@/student/components/Student'
import trainingCenter from '@/student/components/trainingCenter'
import myTask from '@/student/components/myTask'
import management from '@/student/components/management'
import abilityfile from '@/student/components/abilityfile'
import datasharing from '@/student/components/datasharing'
import Basic_Accounting from '@/student/components/Basic_Accounting'
import MyCenter from '@/student/components/MyCenter'
import allcase from '@/student/components/allcase'
import casesindex  from '@/student/components/courseTraining/casesindex'
import SeeTheCase  from '@/student/components/SeeTheCase'
import examines  from '@/student/components/examines'


import Educat from '@/educat/components/Educat'
import Monitor from '@/educat/components/Monitor'
import Teaching from '@/educat/components/Teaching'
import Plan from '@/educat/components/Plan'
import Account from '@/educat/components/Account'
import EAbility from '@/educat/components/EAbility'
import Manaportal from '@/educat/components/Manaportal'
import Usermsg from '@/educat/components/Usermsg'
import taskdetail from '@/educat/components/taskdetail'
import examine from '@/educat/components/examine'
import pubFile from '@/educat/components/pubFile'
import eabilityData from '@/educat/components/eabilityData'

import tizu from '@/topic/components/tizu'
import teacMarking from '@/topic/components/teacMarking'
import teacPreview from '@/topic/components/teacPreview'
import teacTiZu from '@/topic/components/teacTiZu'
import choice_question from '@/topic/components/choice_question'
import correct from '@/topic/components/correct'
import practice from '@/topic/components/practice'
import achieve from '@/topic/components/achieve'
import multiple_choice from '@/topic/components/multiple_choice'


Vue.use(Router)

export default new Router({
  routes: [
  	{
      path: '', redirect: '/Load'
    },
    {
      path: '/Load',
      name: 'Load',
      component: Load
    },
    {
      path: '/Teacher',
      component: Teacher,
      children: [
        {
          path: '', redirect: 'Shixun'
        },
        {
          path: '/Teacher/Yuanxiao',
          name: 'Yuanxiao',
          component: Yuanxiao
        },
        {
          path: '/Teacher/Shixun',
          name: 'Shixun',
          component: Shixun,
          children: [
            {
              path: '/Teacher/Shixun/Course',
              name: 'Course',
              component: Course,
              children: [
                {
                  path: '/Teacher/Shixun/Course/addProblemSet',
                  name: 'addProblemSet',
                  component: addProblemSet
                },
                {
                  path: '/Teacher/Shixun/Course/addProblem',
                  name: 'addProblem',
                  component: addProblem
                },
                {
                  path: '/Teacher/Shixun/Course/editProblem',
                  name: 'editProblem',
                  component: editProblem
                },
                {
                  path: '/Teacher/Shixun/Course/allTrueCase',
                  name: 'allTrueCase',
                  component: allTrueCase,
                  children: [
                    {
                      path: '/Teacher/Shixun/Course/allTrueCase/pubMission',
                      name: 'pubMission',
                      component: pubMission
                    }
                  ]
                }
              ]
            },
          ]
        },
        {
          path: '/Teacher/Renwu',
          name: 'Renwu',
          component: Renwu
        },
        {
          path: '/Teacher/Shuju',
          name: 'Shuju',
          component: Shuju
        },
        {
          path: '/Teacher/Ability',
          name: 'Ability',
          component: Ability
        },
        {
          path: '/Teacher/Ziliao',
          name: 'Ziliao',
          component: Ziliao
        },
        {
          path: '/Teacher/Geren',
          name: 'Geren',
          component: Geren
        }
      ]
    },
    {
      path: '/Student',
      component: Student,
      children: [
        {
          path: '', redirect: 'trainingCenter'
        },
        {
          path: 'trainingCenter',
          name: 'trainingCenter',
          component:trainingCenter,
          children:[
		        {
		          path:'Basic_Accounting',
		          name:'Basic_Accounting',
		          component:Basic_Accounting
		        },
          ]
        },
        {
          path:'myTask',
          name:'myTask',
          component: myTask,
            children: [
                {
                  path: 'examines',
                  name: 'examines',
                  component: examines
                },
            ]
        },
        {
          path:'management',
          name:'management',
          component:management
        },
        {
          path:'abilityfile',
          name:'abilityfile',
          component:abilityfile
        },
        {
          path:'datasharing',
          name:'datasharing',
          component:datasharing
        },
		    {
		      path: 'MyCenter',
		      name: 'MyCenter',
		      component: MyCenter
		    },
		    {
          path: 'Yuanxiao',
          component: Yuanxiao
        },
         {
          path: 'allcase',
          name: 'allcase',
          component: allcase,
        },
        {
          path: 'casesindex',
          name: 'casesindex',
          component: casesindex
        },
        {
				  path: 'SeeTheCase',
				  name: 'SeeTheCase',
				  component: SeeTheCase,
				}
      ]
    },
    {
      path: '/Educat',
      component: Educat,
      children: [
        {
          path: '', redirect: 'Teaching'
        },
        {
          path: 'Monitor',
          name: 'Monitor',
          component: Monitor,
        },
        {
          path: 'Teaching',
          name: 'Teaching',
          component: Teaching,
          children:[
		        {
		        path: 'taskdetail',
		        name: 'taskdetail',
		        component: taskdetail,
		        children:[
				        {
				        path: 'examine',
				        name: 'examine',
				        component: examine,
				        }
		        	]
		        }
        	]
        },
        {
          path: 'Plan',
          name: 'Plan',
          component: Plan,
          children: [
            {
              path: 'pubFile',
              name: 'pubFile',
              component: pubFile,
            },
          ]
        },
        {
          path: 'Account',
          name: 'Account',
          component: Account,
        },
        {
          path: 'EAbility',
          name: 'EAbility',
          component: EAbility,
          children: [
            {
              path: 'eabilityData',
              name: 'eabilityData',
              component: eabilityData,
            }
          ]
        },
        {
          path: 'Manaportal',
          name: 'Manaportal',
          component: Manaportal,
        },
        {
          path: 'Usermsg',
          name: 'Usermsg',
          component: Usermsg,
        },
      ]
    },
    {
      path: '/tizu',
      component: tizu,
      children: [
        {
          path: 'teacMarking',
          name: 'teacMarking',
          component: teacMarking
        },
        {
          path: 'teacPreview',
          name: 'teacPreview',
          component: teacPreview
        },
        {
          path: 'teacTiZu',
          name: 'teacTiZu',
          component: teacTiZu
        },
        {
          path: 'choice_question',
          name: 'choice_question',
          component: choice_question,
        },
        {
          path: 'correct',
          name: 'correct',
          component: correct,
        },
        {
          path: 'practice',
          name: 'practice',
          component: practice,
        },
        {
          path: 'achieve',
          name: 'achieve',
          component: achieve,
        },
        {
          path: 'multiple_choice',
          name: 'multiple_choice',
          component: multiple_choice,
        }
      ]
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    // return 期望滚动到哪个的位置
  }
})
