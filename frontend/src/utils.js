import moment from 'moment';

export const isNull = value => {
    try {
        return value === null;
    } catch (e) {
        return false;
    }
};

export const createDivEl = ({id, className, content, background}) => {
    const el = document.createElement('div');
    if (id) {
        el.id = id;
    }
    if (className) {
        el.className = Array.isArray(className) ? className.join(' ') : className;
    }
    if (content) {
        el.innerHTML = content;
    }
    if (background) {
        el.style.backgroundImage = `url(${background})`;
    }
    return el;
};

export const timestampToTime = timestamp => {
    const now = new Date().getTime();
    const nowDate = moment.unix(now.toString().length === 13 ? now / 1000 : now).format('MM/DD');

    let date = moment.unix(timestamp.toString().length === 13 ? timestamp / 1000 : timestamp).format('MM/DD');
    if (date === 'Invalid date') {
        date = '';
    }

    return nowDate === date
        ? moment.unix(timestamp.toString().length === 13 ? timestamp / 1000 : timestamp).format('HH:mm')
        : date;
};

export const setDataInElement = (target, key, data) => {
    target.dataset[`${key}`] = data;
};

export const protectFromXSS = text => {
    return typeof text === 'string'
        ? text
            .replace(/\&/g, '&amp;')
            .replace(/\</g, '&lt;')
            .replace(/\>/g, '&gt;')
            .replace(/\"/g, '&quot;')
            .replace(/\'/g, '&apos;')
        : text;
};

export const isImage = fileType => {
    const regex = /^image\/.+$/;
    return regex.test(fileType);
};

export const errorAlert = (message, reload = true) => {
    alert(message);
    if (reload) {
        location.reload(true);
    }
};

export const uuid4 = () => {
    let d = new Date().getTime();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        const r = ((d + Math.random() * 16) % 16) | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    });
};

export const isScrollBottom = target => {
    return target.scrollTop + target.offsetHeight >= target.scrollHeight;
};

export const appendToFirst = (target, newElement) => {
    if (target.childNodes.length > 0) {
        target.insertBefore(newElement, target.childNodes[0]);
    } else {
        target.appendChild(newElement);
    }
};

export const removeClass = (target, className) => {
    if (target.classList) {
        target.classList.remove(className);
    } else {
        target.className = target.className.replace(
            new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'),
            ''
        );
    }
};

export const getDataInElement = (target, key) => {
    return target.dataset[`${key}`];
};

export const isEmpty = value => {
    return value === null || value === undefined || value.length === 0;
};