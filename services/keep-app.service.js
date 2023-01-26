import { utilService } from './util.service.js'
import { storageService } from './async-storage.service.js'

export const keepService = {
    query,
    get,
    remove,
    save,
    getEmptyNote
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

function getEmptyNote(type) {
    switch (type) {
        case 'noteTxt':
            return {
                id: utilService.makeId(),
                type: "noteTxt",
                isPinned: false,
                info: {
                    txt: ""
                },
                style: {
                    backgroundColor: "#d7aefb"
                }
            }
        case 'noteImg':
            return {
                id: utilService.makeId(),
                type: "noteImg",
                isPinned: false,
                info: {
                    url: "",
                    title: ""
                },
                style: {
                    backgroundColor: "#d7aefb"
                }
            }
        case 'noteTodos':
            return {
                id: utilService.makeId(),
                type: "noteTodos",
                isPinned: false,
                info: {
                    label: "",
                    todos: [
                        { txt: "", status: false },
                        { txt: "", status: false },
                        { txt: "", status: false },
                        { txt: "", status: false }
                    ]
                },
                style: {
                    backgroundColor: "#d7aefb"
                }
            }
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
                    backgroundColor: "#d7aefb"
                }

            },
            {
                id: "n102",
                type: "noteImg",
                isPinned: false,
                info: {
                    url: "https://res.cloudinary.com/dgvpl7cdq/image/upload/v1674691290/eayey7i3gccplof0m85p.webp",
                    title: "Bobi and Me"
                },
                style: {
                    backgroundColor: "#cbf0f8"
                }
            },
            {
                id: "n103",
                type: "noteTodos",
                isPinned: false,
                info: {
                    label: "Get my stuff together",
                    todos: [
                        { txt: "Driving liscence", doneAt: null, status: true },
                        { txt: "Coding power", doneAt: 187111111, status: false },
                        { txt: "complete sprint 3", doneAt: null, status: true },
                        { txt: "go to gym", doneAt: 187111111, status: false }
                    ]
                },
                style: {
                    backgroundColor: "#e6c9a8"
                }
            },
            {
                id: "n104",
                type: "noteTxt",
                isPinned: true,
                info: {
                    txt: "Fullstack Me Baby!"
                },
                style: {
                    backgroundColor: "#fdcfe8"
                }

            },
            {
                id: "n105",
                type: "noteImg",
                isPinned: false,
                info: {
                    url: "https://res.cloudinary.com/dgvpl7cdq/image/upload/v1674691261/syow5ftdrrgtbjg2fpml.webp",
                    title: "Bobi and Me"
                },
                style: {
                    backgroundColor: "#d7aefb"
                }
            },
            {
                id: "n106",
                type: "noteTodos",
                isPinned: false,
                info: {
                    label: "Get my stuff together",
                    todos: [
                        { txt: "Driving liscence", doneAt: null, status: true },
                        { txt: "Coding power", doneAt: 187111111, status: false }
                    ]
                },
                style: {
                    backgroundColor: "#aecbfa"
                }
            },
            {
                id: "n107",
                type: "noteTxt",
                isPinned: false,
                info: {
                    txt: "Fullstack Me Baby!"
                },
                style: {
                    backgroundColor: "#cbf0f8"
                }

            },
            {
                id: "n108",
                type: "noteImg",
                isPinned: false,
                info: {
                    url: "https://res.cloudinary.com/dgvpl7cdq/image/upload/v1674691250/u9qtvhejgjcygy4cjicw.webp",
                    title: "Bobi and Me"
                },
                style: {
                    backgroundColor: "#a7ffeb"
                }
            },
            {
                id: "n109",
                type: "noteTodos",
                isPinned: false,
                info: {
                    label: "Get my stuff together",
                    todos: [
                        { txt: "Driving liscence", doneAt: null, status: true },
                        { txt: "Coding power", doneAt: 187111111, status: false }
                    ]
                },
                style: {
                    backgroundColor: "#ccff90"
                }
            },
            {
                id: "n110",
                type: "noteTxt",
                isPinned: false,
                info: {
                    txt: "Fullstack Me Baby!"
                },
                style: {
                    backgroundColor: "#fff475"
                }

            },
            {
                id: "n111",
                type: "noteImg",
                isPinned: false,
                info: {
                    url: "https://res.cloudinary.com/dgvpl7cdq/image/upload/v1674691224/unp903e23lgj9uwetglw.webp",
                    title: "Bobi and Me"
                },
                style: {
                    backgroundColor: "#f28b82"
                }
            },
            {
                id: "n112",
                type: "noteTodos",
                isPinned: false,
                info: {
                    label: "Get my stuff together",
                    todos: [
                        { txt: "Driving liscence", doneAt: null, status: false },
                        { txt: "Coding power", doneAt: 187111111, status: false }
                    ]
                },
                style: {
                    backgroundColor: "#fbbc04"
                }
            },
            {
                id: "n113",
                type: "noteImg",
                isPinned: true,
                info: {
                    url: "https://res.cloudinary.com/dgvpl7cdq/image/upload/v1674691185/icencpihsbyxgsabbwo7.webp",
                    title: "Bobi and Me"
                },
                style: {
                    backgroundColor: "#e8eaed"
                }
            },
            {
                id: "n114",
                type: "noteImg",
                isPinned: false,
                info: {
                    url: "https://res.cloudinary.com/dgvpl7cdq/image/upload/v1674691185/icencpihsbyxgsabbwo7.webp",
                    title: "Bobi and Me"
                },
                style: {
                    backgroundColor: "#e6c9a8"
                }
            },
            {
                id: "n115",
                type: "noteImg",
                isPinned: false,
                info: {
                    url: "https://res.cloudinary.com/dgvpl7cdq/image/upload/v1674691273/xkq3salpxnpnpd3glzh1.webp",
                    title: "Bobi and Me"
                },
                style: {
                    backgroundColor: "#fdcfe8"
                }
            }
        ]
        localStorage.setItem(NOTES_KEY, JSON.stringify(notes) || null)
    }
}