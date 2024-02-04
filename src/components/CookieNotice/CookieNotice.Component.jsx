import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import {getCookie, setCookie} from 'tiny-cookie';

const CookieNoticeComponent = () => {
    const [items, setItems] = useState({
        name: 'zureaCookie',
        value: ''
    });
    //const [zureaCookie] = useState(getCookie(items.name));
    let [loading, setLoading] = useState(false);

    useEffect(() => {
        const delay = 1500;
        const timeoutId = setTimeout(() => {
            setLoading(true);
        }, delay);

        return () => {
            clearTimeout(timeoutId);
        }
    }, []);

    const acceptCookie = (e) => {
        e.preventDefault();
        let newItemsObj = {...items};
        newItemsObj.value = 'Accepted';
        setItems(newItemsObj);
        setCookie(items.name, newItemsObj.value, {expires: '1Y'});
    }

    const declineCookie = (e) => {
        e.preventDefault();
        let newItemsObj = {...items};
        newItemsObj.value = 'Declined';
        setItems(newItemsObj);
        setCookie(items.name, newItemsObj.value, { expires: '1Y' });
    }

    const renderCookie = () => {
        const zureaCookie = getCookie(items.name);
        return (
            <>
                {!zureaCookie && loading ? (<div className='cookie-notice-container'>
                    <div className='cookie-notice-wrapper'>
                        <div className='cookie-notice-content'>
                            <p>We use cookies improve your experience on our website. By browsing this website,
                                you agree to our use of cookies.</p>
                        </div>
                        <div className='cookie-notice-btn-wrapper'>
                            <Link className='btn-terms'>Terms & Conditions </Link><br />
                            <Link className='btn-decline text-danger' onClick={declineCookie}>Decline &#10006;</Link><br />
                            <Link className='btn-accept text-success' onClick={acceptCookie}>Accept &#10004;</Link>
                        </div>
                    </div>
                </div>) : (null)}
            </>
        )
    }

    return renderCookie();
}

export default CookieNoticeComponent;