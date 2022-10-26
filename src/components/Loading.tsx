import {FontAwesomeIcon} from "@fortawesome/react-fontawesome"
import {faSpinner} from "@fortawesome/free-solid-svg-icons"


export function Loading() {
    return(
        <div className="container">
            <div className="flex justify-center">
                <FontAwesomeIcon icon={faSpinner} className='animate-spin icon h-[50px]'/>
            </div>
        </div>
    )
}