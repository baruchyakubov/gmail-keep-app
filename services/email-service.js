import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

export const gmailService = {
    query,
    get,
    remove,
    save,
    getUser,
    queryCriteria,
    saveCriteria,
    sendEmail
}

const EMAILS_KEY = 'emails'
const CRITERIA_KEY = 'criteria'

_createEmails()
_createCriteria()

function query() {
    return storageService.query(EMAILS_KEY)
}

function queryCriteria() {
    return storageService.query(CRITERIA_KEY)
}

function _createCriteria() {
    let criteria = JSON.parse(localStorage.getItem(CRITERIA_KEY))
    if (!criteria) {
        criteria = {
            status: 'inbox',
            txt: '',
            isRead: true,
            isStared: false,
            lables: ['important', 'romantic']
        }
        localStorage.setItem(CRITERIA_KEY, JSON.stringify(criteria) || null)
    }
}

function getUser() {
    return Promise.resolve({
        email: 'user@appsus.com',
        fullname: 'Mahatma Appsus'
    })
}

function get(emailId) {
    return storageService.get(EMAILS_KEY, emailId)
}

function remove(emailId) {
    return storageService.remove(EMAILS_KEY, emailId)
}

function save(email) {
    if (email.id) {
        return storageService.put(EMAILS_KEY, email)
    } else {
        return storageService.post(EMAILS_KEY, email)
    }
}

function sendEmail(to, subject, body , note) {
    var email = {
        id: null,
        subject: subject,
        body: body,
        isRead: true,
        sentAt: Date.now(),
        from: 'user@appsus.com',
        to,
        fullname: 'Mahatma Appsus',
        status: 'sent',
        note
    }
    return save(email)
}

function saveCriteria(criteria) {
    localStorage.setItem(CRITERIA_KEY, JSON.stringify(criteria) || null)
    return Promise.resolve(criteria)
}


function _createEmails() {
    let emails = JSON.parse(localStorage.getItem(EMAILS_KEY))

    if (!emails || !emails.length) {
        console.log('storage');
        emails = [
            {
                id: utilService.makeId(),
                subject: 'Miss you!',
                body: 'Would love to catch up sometimes',
                isRead: true,
                sentAt: 1551133930594,
                from: 'user@appsus.com',
                to: 'momo@momo.com',
                fullname: 'Mahatma Appsus',
                status: 'sent',
                note:'',
                isStared:true
            },

            {
                id: utilService.makeId(),
                subject: 'Now launched: new routing and address capabilities',
                body: 'Now launched! New routing and address capabilities Routes API, eco-friendly routing, and Address Validation have launched. Explore the new documentation and demos today.',
                isRead: true,
                sentAt: 1551133930594,
                from: 'momo@momo.com',
                to: 'user@appsus.com',
                fullname: 'Google Maps Platform',
                status: 'inbox',
                note:'',
                isStared:true
            },
            {
                id: utilService.makeId(),
                subject: 'Miss you!',
                body: 'Roasted Vegetable Salad with Maple Orange Cinnamon Dressing This Roasted Root recipe features butternut squash, crunchy pecans, sweet beets, and a dressing that will have you drooling.',
                isRead: false,
                sentAt: 1551133930594,
                from: 'momo@momo.com',
                to: 'user@appsus.com',
                fullname: 'My fitness pal',
                status: 'inbox',
                note:'',
                isStared:true
            },
            {
                id: utilService.makeId(),
                subject: 'Miss you!',
                body: 'Roasted Vegetable Salad with Maple Orange Cinnamon Dressing This Roasted Root recipe features butternut squash, crunchy pecans, sweet beets, and a dressing that will have you drooling.',
                isRead: true,
                sentAt: 1551133930594,
                from: 'momo@momo.com',
                to: 'user@appsus.com',
                fullname: 'muki',
                status: 'inbox',
                note:'',
                isStared:false
            },
            {
                id: utilService.makeId(),
                subject: 'Miss you!',
                body: 'Roasted Vegetable Salad with Maple Orange Cinnamon Dressing This Roasted Root recipe features butternut squash, crunchy pecans, sweet beets, and a dressing that will have you drooling.',
                isRead: false,
                sentAt: 1551133930594,
                from: 'momo@momo.com',
                to: 'user@appsus.com',
                fullname: 'duki',
                status: 'inbox',
                note:'',
                isStared:true
            },
            {
                id: utilService.makeId(),
                subject: 'Miss you!',
                body: 'Roasted Vegetable Salad with Maple Orange Cinnamon Dressing This Roasted Root recipe features butternut squash, crunchy pecans, sweet beets, and a dressing that will have you drooling.',
                isRead: false,
                sentAt: 1551133930594,
                from: 'momo@momo.com',
                to: 'user@appsus.com',
                fullname: 'pet',
                status: 'inbox',
                note:'',
                isStared:false
            },
            {
                id: utilService.makeId(),
                subject: 'Miss you!',
                body: 'Roasted Vegetable Salad with Maple Orange Cinnamon Dressing This Roasted Root recipe features butternut squash, crunchy pecans, sweet beets, and a dressing that will have you drooling.',
                isRead: false,
                sentAt: 1551133930594,
                from: 'momo@momo.com',
                to: 'user@appsus.com',
                fullname: 'netflix',
                status: 'inbox',
                note:'',
                isStared:false
            },
            {
                id: utilService.makeId(),
                subject: 'Miss you!',
                body: 'Roasted Vegetable Salad with Maple Orange Cinnamon Dressing This Roasted Root recipe features butternut squash, crunchy pecans, sweet beets, and a dressing that will have you drooling.',
                isRead: false,
                sentAt: 1551133930594,
                from: 'momo@momo.com',
                to: 'user@appsus.com',
                fullname: 'puki',
                status: 'inbox',
                note:'',
                isStared:false
            },
            {
                id: utilService.makeId(),
                subject: 'Miss you!',
                body: 'Roasted Vegetable Salad with Maple Orange Cinnamon Dressing This Roasted Root recipe features butternut squash, crunchy pecans, sweet beets, and a dressing that will have you drooling.',
                isRead: false,
                sentAt: 1551133930594,
                from: 'momo@momo.com',
                to: 'user@appsus.com',
                fullname: 'puki',
                status: 'inbox',
                note:'',
                isStared:false
            },
            {
                id: utilService.makeId(),
                subject: 'Miss you!',
                body: 'Roasted Vegetable Salad with Maple Orange Cinnamon Dressing This Roasted Root recipe features butternut squash, crunchy pecans, sweet beets, and a dressing that will have you drooling.',
                isRead: true,
                sentAt: 1551133930594,
                from: 'momo@momo.com',
                to: 'user@appsus.com',
                fullname: 'puki',
                status: 'inbox',
                note:'',
                isStared:false
            },
            {
                id: utilService.makeId(),
                subject: 'Miss you!',
                body: 'Roasted Vegetable Salad with Maple Orange Cinnamon Dressing This Roasted Root recipe features butternut squash, crunchy pecans, sweet beets, and a dressing that will have you drooling.',
                isRead: true,
                sentAt: 1551133930594,
                from: 'momo@momo.com',
                to: 'user@appsus.com',
                fullname: 'puki',
                status: 'inbox',
                note:'',
                isStared:false
            },
            {
                id: utilService.makeId(),
                subject: 'Miss you!',
                body: 'Roasted Vegetable Salad with Maple Orange Cinnamon Dressing This Roasted Root recipe features butternut squash, crunchy pecans, sweet beets, and a dressing that will have you drooling.',
                isRead: false,
                sentAt: 1551133930594,
                from: 'momo@momo.com',
                to: 'user@appsus.com',
                fullname: 'puki',
                status: 'inbox',
                note:'',
                isStared:false
            },
            {
                id: utilService.makeId(),
                subject: 'Miss you!',
                body: 'Roasted Vegetable Salad with Maple Orange Cinnamon Dressing This Roasted Root recipe features butternut squash, crunchy pecans, sweet beets, and a dressing that will have you drooling.',
                isRead: true,
                sentAt: 1551133930594,
                from: 'momo@momo.com',
                to: 'user@appsus.com',
                fullname: 'puki',
                status: 'inbox',
                note:'',
                isStared:false
            },
            {
                id: utilService.makeId(),
                subject: 'Miss you!',
                body: 'Roasted Vegetable Salad with Maple Orange Cinnamon Dressing This Roasted Root recipe features butternut squash, crunchy pecans, sweet beets, and a dressing that will have you drooling.',
                isRead: false,
                sentAt: 1551133930594,
                from: 'momo@momo.com',
                to: 'user@appsus.com',
                fullname: 'puki',
                status: 'inbox',
                note:'',
                isStared:false
            },
            {
                id: utilService.makeId(),
                subject: 'Miss you!',
                body: 'Roasted Vegetable Salad with Maple Orange Cinnamon Dressing This Roasted Root recipe features butternut squash, crunchy pecans, sweet beets, and a dressing that will have you drooling.',
                isRead: false,
                sentAt: 1551133930594,
                from: 'momo@momo.com',
                to: 'user@appsus.com',
                fullname: 'puki',
                status: 'inbox',
                note:'',
                isStared:false
            },
            {
                id: utilService.makeId(),
                subject: 'Now launched: new routing and address capabilities',
                body: 'Now launched! New routing and address capabilities Routes API, eco-friendly routing, and Address Validation have launched. Explore the new documentation and demos today.',
                isRead: true,
                sentAt: 1551133930594,
                from: 'momo@momo.com',
                to: 'user@appsus.com',
                fullname: 'Google Maps Platform',
                status: 'inbox',
                note:'',
                isStared:false
            },
            {
                id: utilService.makeId(),
                subject: 'Now launched: new routing and address capabilities',
                body: 'Now launched! New routing and address capabilities Routes API, eco-friendly routing, and Address Validation have launched. Explore the new documentation and demos today.',
                isRead: true,
                sentAt: 1551133930594,
                from: 'momo@momo.com',
                to: 'user@appsus.com',
                fullname: 'Google Maps Platform',
                status: 'inbox',
                note:'',
                isStared:false
            },
            {
                id: utilService.makeId(),
                subject: 'Now launched: new routing and address capabilities',
                body: 'Now launched! New routing and address capabilities Routes API, eco-friendly routing, and Address Validation have launched. Explore the new documentation and demos today.',
                isRead: true,
                sentAt: 1551133930594,
                from: 'momo@momo.com',
                to: 'user@appsus.com',
                fullname: 'Google Maps Platform',
                status: 'inbox',
                note:'',
                isStared:false
            },
            {
                id: utilService.makeId(),
                subject: 'Now launched: new routing and address capabilities',
                body: 'Now launched! New routing and address capabilities Routes API, eco-friendly routing, and Address Validation have launched. Explore the new documentation and demos today.',
                isRead: true,
                sentAt: 1551133930594,
                from: 'momo@momo.com',
                to: 'user@appsus.com',
                fullname: 'Google Maps Platform',
                status: 'inbox',
                note:'',
                isStared:false
            },
        ]
        localStorage.setItem(EMAILS_KEY, JSON.stringify(emails) || null)
    }
}