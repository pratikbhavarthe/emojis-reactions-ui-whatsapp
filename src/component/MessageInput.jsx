import React, { useState } from "react";
import { useEffect } from "react";
import { FaArrowLeft, FaPaperclip, FaPaperPlane, FaPlusCircle, FaSmile } from 'react-icons/fa';
import { getMoreReactionsData, getProfilePicture, getReactionData } from "./assets";

export default function MessageInput() {
    const [messageRecord, setMessageRecord] = useState([]);

    const [switchRef, setSwitch] = useState(false);

    return (
        <React.Fragment>
            <div className="message-input-component-container">
                <div className="message-record-wrapper flex flex-col items-end justify-end"
                >
                    {messageRecord?.map((message, messageIndex) => {
                        return (
                            <Message 
                                key={messageIndex}
                                messageText={message?.content}
                                messageTime={message?.time}
                                messageId={`message-block-wpbase_${messageIndex}`}
                            />
                        )
                    })}
                </div>
                <div className="message-input-actions-wrapper" aria-label="message-input">
                    <div className='input-component-wrapper flex flex-row items-center bg-zinc-700 px-3 py-2 rounded-full'>
                        <span className='input-action_message-wrapper font-normal text-zinc-500 flex flex-row items-center justfy-start gap-4 w-fit h-fit'>
                            <span className='input-attach-files-icon-wrapper p-2 flex flex-row items-center justify-center hover:bg-white hover:bg-opacity-10 hover:text-zinc-200 hover:shadow-md rounded-full'>
                                <FaPaperclip />
                            </span>
                            <input type="text" 
                                className='text-sm font-normal placeholder:font-semibold placeholder:text-zinc-500 text-zinc-300 w-[420px] h-auto bg-transparent'
                                placeholder='Type a message'
                                id="message-input"
                                onKeyDown={(keyboardEvent) => {
                                    if (keyboardEvent.code.toLowerCase() === 'enter') {
                                        let keyboardInput = document.getElementById('message-input').value;
                                        if (keyboardInput !== null && keyboardInput !== undefined && keyboardInput !== "") {
                                            let _currentMessageRecord = messageRecord;
                                            let currentDate = new Date();
                                            _currentMessageRecord.push({
                                                content: document.getElementById('message-input').value, 
                                                time: {
                                                    hours: currentDate.getHours(),
                                                    mins: currentDate.getMinutes(),
                                                    mrdn: currentDate.getHours() <= 11 && currentDate.getHours() > 0 ? 'am' : 'pm'
                                                }
                                            });
                                            setMessageRecord(_currentMessageRecord);
                                            setSwitch(!switchRef);      // will find a solution for it
                                            document.getElementById('message-input').value = "";
                                        }
                                    }
                                }}
                            />
                        </span>
                        <span className='send-button-wrapper flex flex-row items-center justify-center'>
                            <button className='p-3 ml-4 rounded-full bg-teal-600 hover:bg-teal-700 text-white flex flex-row items-center justify-center'
                                onClick={() => {
                                    let keyboardInput = document.getElementById('message-input').value;
                                    if (keyboardInput !== null && keyboardInput !== undefined && keyboardInput !== "") {
                                        let _currentMessageRecord = messageRecord;
                                        let currentDate = new Date();
                                        _currentMessageRecord.push({
                                            content: document.getElementById('message-input').value, 
                                            time: {
                                                hours: currentDate.getHours(),
                                                mins: currentDate.getMinutes(),
                                                mrdn: currentDate.getHours() <= 11 && currentDate.getHours() > 0 ? 'am' : 'pm'
                                            }
                                        });
                                        setMessageRecord(_currentMessageRecord);
                                        setSwitch(!switchRef);
                                        document.getElementById('message-input').value = "";
                                    }
                                }}
                            >
                                <FaPaperPlane />
                            </button>
                        </span>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

function Message({ messageText, messageTime, messageId }) {
    const [reactionActionVisibilty, setReactionActionVisibility] = useState('0%');
    const [reactionListVisibility, setReactionListVisibility] = useState('none');
    const [reactionRecordListWrapperVisibility, setReactionRecordListWrapperVisibility] = useState('none');

    const [reactionRecord, setReactionRecord] = useState([]);
    const [addedReactionsList, setAddedReactionsList] = useState([]);

    const [moreReactionsListVisibility, setMoreReactionsListVisibility] = useState('none');
    const [moreReactionsListRef, setMoreReactionsList] = useState([]);

    const reactionsList = getReactionData();

    useEffect(() => {
        getMoreReactionsData().then(res => {
            setMoreReactionsList(res);
        }).catch(err => console.log('emoji-api-error', err));
    }, []);

    useEffect(() => {
        let reactionListButton = document.querySelector(`#${messageId}`);
        reactionListButton.addEventListener('focusin', () => {
            setTimeout(() => {
                setReactionListVisibility('flex');
            }, 300);
        });
        reactionListButton.addEventListener('focusout', () => {
            setTimeout(() => {
                setReactionListVisibility('none');
            }, 300);
        });
        window.addEventListener('wheel', () => {
            setTimeout(() => {
                setReactionListVisibility('none');
            })
        }, 100)
    });

    useEffect(() => {
        if (!document.getElementById(`message-record-list-opener_${messageId}`)) {
            let reactionRecordListButton = document.getElementById(`message-record-list-opener_${messageId}`);
            reactionRecordListButton?.addEventListener('focusout', () => {
                setTimeout(() => {
                    setReactionRecordListWrapperVisibility('none');
                }, 300);
            })
        }
    });

    useEffect(() => {
        window.onkeyup = function (keyboardEvent) {
            if (keyboardEvent.keyCode === 27) {
                setReactionListVisibility('none');
                setReactionRecordListWrapperVisibility('none');
            }
        }
    });