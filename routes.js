import homePage from './views/app-home.cmp.js'
import aboutPage from './views/app-about.cmp.js'
import emailApp from './views/email-app.cmp.js'
import emailDetails from './apps/mail/email-details.cmps.js'
import emailCompose from './apps/mail/email-compose.cmp.js'

const { createRouter, createWebHashHistory } = VueRouter

const routerOptions = {
	history: createWebHashHistory(),
	routes: [
		{
			path: '/',
			component: homePage
		},
		{
			path: '/about',
			component: aboutPage
		},
		{
			path: '/email-app',
			component: emailApp,
			children:[
				{
					path: '/email-app/:id',
					component: emailDetails
				},
				{
					path: '/email-app/compose',
					component: emailCompose
				}
			]
		}
	],
}

export const router = createRouter(routerOptions)
