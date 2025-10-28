/**
 *  @fileoverview An SVG of a white, small, X mark to indicate deletion of an item.
 */

/**
 *  An SVG of a white X mark to indicate "deletion" of an item. Used to display over words
 *  so that a user may delete a term.
 *  @returns {JSX.Element}
 */
const WhiteCloseSvg = () => {
    return (
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M0.292897 0.29289C-0.0976325 0.68342 -0.0976325 1.31658 0.292897 1.70711L3.87804 5.29223L0.292897 8.87743C-0.0976325 9.26793 -0.0976325 9.90113 0.292897 10.2916C0.683417 10.6821 1.31659 10.6821 1.70711 10.2916L5.29224 6.70643L8.87744 10.2916C9.26794 10.6821 9.90114 10.6821 10.2916 10.2916C10.6821 9.90113 10.6821 9.26793 10.2916 8.87743L6.70644 5.29223L10.2916 1.70712C10.6821 1.3166 10.6821 0.68343 10.2916 0.29291C9.90104 -0.09762 9.26794 -0.09762 8.87744 0.29291L5.29224 3.87803L1.70711 0.29289C1.31659 -0.09763 0.683417 -0.09763 0.292897 0.29289Z"
            fill="white"
        />
        </svg>
    )
}

export default WhiteCloseSvg