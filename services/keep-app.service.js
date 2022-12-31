import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

export const keepService = {
    query,
    get,
    remove,
    save
}

const NOTES_KEY = 'notes'

_createNotes()

function query() {
    return storageService.query(NOTES_KEY)
}

function get(noteId) {
    return storageService.get(NOTES_KEY, noteId)
}

function remove(noteId) {
    return storageService.remove(NOTES_KEY, noteId)
}

function save(note) {
    if (note.id) {
        return storageService.put(NOTES_KEY, note)
    } else {
        return storageService.post(NOTES_KEY, note)
    }
}

function _createNotes() {
    let notes = JSON.parse(localStorage.getItem(NOTES_KEY))

    if (!notes || !notes.length) {
        console.log('storage');
        notes = [
            {
                id: "n101",
                type: "noteTxt",
                isPinned: true,
                info: {
                    txt: "Vue is Life!!"
                },
                style: {
                    backgroundColor: "rgb(98, 180, 169)"
                }

            },
            {
                id: "n102",
                type: "noteImg",
                info: {
                    url: "../../assets/img/img-1.jpg",
                    title: "Bobi and Me"
                },
                style: {
                    backgroundColor: "rgb(98, 180, 169)"
                }
            },
            {
                id: "n103",
                type: "noteTodos",
                info: {
                    label: "Get my stuff together",
                    todos: [
                        { txt: "Driving liscence", doneAt: null },
                        { txt: "Coding power", doneAt: 187111111 },
                        { txt: "complete sprint 3", doneAt: null },
                        { txt: "go to gym", doneAt: 187111111 }
                    ]
                },
                style: {
                    backgroundColor: "rgb(98, 180, 169)"
                }
            },
            {
                id: "n101",
                type: "noteTxt",
                isPinned: true,
                info: {
                    txt: "Fullstack Me Baby!"
                },
                style: {
                    backgroundColor: "rgb(143, 177, 228)"
                }

            },
            {
                id: "n102",
                type: "noteImg",
                info: {
                    url: "../../assets/img/img-2.jpg",
                    title: "Bobi and Me"
                },
                style: {
                    backgroundColor: "rgb(228, 228, 143)"
                }
            },
            {
                id: "n103",
                type: "noteTodos",
                info: {
                    label: "Get my stuff together",
                    todos: [
                        { txt: "Driving liscence", doneAt: null },
                        { txt: "Coding power", doneAt: 187111111 }
                    ]
                },
                style: {
                    backgroundColor: "rgb(228, 228, 143)"
                }
            },
            {
                id: "n101",
                type: "noteTxt",
                isPinned: true,
                info: {
                    txt: "Fullstack Me Baby!"
                },
                style: {
                    backgroundColor: "rgb(173, 98, 180)"
                }

            },
            {
                id: "n102",
                type: "noteImg",
                info: {
                    url: "../../assets/img/img-3.jpg",
                    title: "Bobi and Me"
                },
                style: {
                    backgroundColor: "rgb(145, 180, 98)"
                }
            },
            {
                id: "n103",
                type: "noteTodos",
                info: {
                    label: "Get my stuff together",
                    todos: [
                        { txt: "Driving liscence", doneAt: null },
                        { txt: "Coding power", doneAt: 187111111 }
                    ]
                },
                style: {
                    backgroundColor: "rgb(145, 180, 98)"
                }
            },
            {
                id: "n101",
                type: "noteTxt",
                isPinned: true,
                info: {
                    txt: "Fullstack Me Baby!"
                },
                style: {
                    backgroundColor: "rgb(217, 190, 240)"
                }

            },
            {
                id: "n102",
                type: "noteImg",
                info: {
                    url: "../../assets/img/img-4.jpg",
                    title: "Bobi and Me"
                },
                style: {
                    backgroundColor: "rgb(228, 143, 154)"
                }
            },
            {
                id: "n103",
                type: "noteTodos",
                info: {
                    label: "Get my stuff together",
                    todos: [
                        { txt: "Driving liscence", doneAt: null },
                        { txt: "Coding power", doneAt: 187111111 }
                    ]
                },
                style: {
                    backgroundColor: "rgb(228, 163, 143)"
                }
            },
            {
                id: "n102",
                type: "noteImg",
                info: {
                    url: "../../assets/img/img-5.jpg",
                    title: "Bobi and Me"
                },
                style: {
                    backgroundColor: "rgb(160, 228, 143)"
                }
            },
            {
                id: "n102",
                type: "noteImg",
                info: {
                    url: "../../assets/img/img-6.jpg",
                    title: "Bobi and Me"
                },
                style: {
                    backgroundColor: "rgb(143, 177, 228)"
                }
            },
            {
                id: "n102",
                type: "noteImg",
                info: {
                    url: "../../assets/img/img-7.jpg",
                    title: "Bobi and Me"
                },
                style: {
                    backgroundColor: "rgb(228, 228, 143)"
                }
            },
        ]
        localStorage.setItem(NOTES_KEY, JSON.stringify(notes) || null)
    }
}