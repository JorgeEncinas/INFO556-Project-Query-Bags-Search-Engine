const DownArrowSvg = ({shouldPointDown} : { shouldPointDown : boolean}) => {
    return (
        <svg
            className={` ${shouldPointDown ? "" : "rotate-180"} transition ease-in-out duration-300`}
            width="41" height="41"
            viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M31.2504 26.1192C31.9175 25.4521 31.9175 24.3704 31.2504 23.7033L22.8929 15.3539C21.5583 14.0207 19.3959 14.0213 18.0621 15.3551L9.70775 23.7094C9.04061 24.3766 9.04061 25.4583 9.70775 26.1254C10.3749 26.7926 11.4566 26.7926 12.1237 26.1254L19.2741 18.975C19.9414 18.3079 21.0229 18.3079 21.6901 18.975L28.8345 26.1192C29.5016 26.7863 30.5833 26.7863 31.2504 26.1192Z"
                fill="#B0B0B0"
            />
        </svg>

    )
}

export default DownArrowSvg