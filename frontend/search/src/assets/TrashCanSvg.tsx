/**
 *  @fileoverview A small, white, reusable SVG of a trash can used to convey the idea of deleting a set of items.
 */


/**
 *  An SVG of a trash can used to convey the idea of deleting, or emptying-out a set of items,
 *  particularly in the Query Bags.
 *  @returns {JSX.Element}
 */
const TrashCanSvg = () => {
    return (
        <svg width="19" height="19" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M7.71594 3.36541C8.06244 2.38508 8.9974 1.68271 10.0964 1.68271C11.1953 1.68271 12.1303 2.38508 12.4768 3.36541"
                stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <path d="M17.2477 5.0481H2.9447" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <path d="M15.8453 7.15149L15.4582 12.956C15.3093 15.1897 15.2349 16.3066 14.5071 16.9875C13.7793 17.6684 12.66 17.6684 10.4213 17.6684H9.77073C7.53202 17.6684 6.41269 17.6684 5.68492 16.9875C4.95715 16.3066 4.88269 15.1897 4.73377 12.956L4.3468 7.15149"
                stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <path d="M7.9928 9.25485L8.41347 13.4616" stroke="white" strokeWidth="2" strokeLinecap="round"/>
            <path d="M12.1995 9.25485L11.7788 13.4616" stroke="white" strokeWidth="2" strokeLinecap="round"/>
        </svg>

    )
}

export default TrashCanSvg