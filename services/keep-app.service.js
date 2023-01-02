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
                    backgroundColor: "#d7aefb"
                }

            },
            {
                id: "n102",
                type: "noteImg",
                info: {
                    url: "https://res.cloudinary.com/dgvpl7cdq/image/upload/v1672682424/fbhakz9leiautymqoskq.jpg",
                    title: "Bobi and Me"
                },
                style: {
                    backgroundColor: "#cbf0f8"
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
                info: {
                    url: "https://res.cloudinary.com/dgvpl7cdq/image/upload/v1672682415/gthyg1jodv9sr8vsz86u.jpg",
                    title: "Bobi and Me"
                },
                style: {
                    backgroundColor: "#d7aefb"
                }
            },
            {
                id: "n106",
                type: "noteTodos",
                info: {
                    label: "Get my stuff together",
                    todos: [
                        { txt: "Driving liscence", doneAt: null },
                        { txt: "Coding power", doneAt: 187111111 }
                    ]
                },
                style: {
                    backgroundColor: "#aecbfa"
                }
            },
            {
                id: "n107",
                type: "noteTxt",
                isPinned: true,
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
                info: {
                    url: "https://res.cloudinary.com/dgvpl7cdq/image/upload/v1672682405/eg6higcjdcuflv1y0j87.jpg",
                    title: "Bobi and Me"
                },
                style: {
                    backgroundColor: "#a7ffeb"
                }
            },
            {
                id: "n109",
                type: "noteTodos",
                info: {
                    label: "Get my stuff together",
                    todos: [
                        { txt: "Driving liscence", doneAt: null },
                        { txt: "Coding power", doneAt: 187111111 }
                    ]
                },
                style: {
                    backgroundColor: "#ccff90"
                }
            },
            {
                id: "n110",
                type: "noteTxt",
                isPinned: true,
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
                info: {
                    url: "https://res.cloudinary.com/dgvpl7cdq/image/upload/v1672682386/jw7tjqbazxpxbj5aswmk.jpg",
                    title: "Bobi and Me"
                },
                style: {
                    backgroundColor: "#f28b82"
                }
            },
            {
                id: "n112",
                type: "noteTodos",
                info: {
                    label: "Get my stuff together",
                    todos: [
                        { txt: "Driving liscence", doneAt: null },
                        { txt: "Coding power", doneAt: 187111111 }
                    ]
                },
                style: {
                    backgroundColor: "#fbbc04"
                }
            },
            {
                id: "n113",
                type: "noteImg",
                info: {
                    url: "https://res.cloudinary.com/dgvpl7cdq/image/upload/v1672682377/ib1aleyfyjm1l29dd1rj.jpg",
                    title: "Bobi and Me"
                },
                style: {
                    backgroundColor: "#e8eaed"
                }
            },
            {
                id: "n114",
                type: "noteImg",
                info: {
                    url: "https://res.cloudinary.com/dgvpl7cdq/image/upload/v1672682395/tfvahnqddjhj1fxybou6.jpg",
                    title: "Bobi and Me"
                },
                style: {
                    backgroundColor: "#e6c9a8"
                }
            },
            {
                id: "n115",
                type: "noteImg",
                info: {
                    url: "https://res.cloudinary.com/dgvpl7cdq/image/upload/v1672682366/qcwkidteaegfwzlembaa.jpg",
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