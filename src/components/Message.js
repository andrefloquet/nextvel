import SuccessSvg from '@/components/SuccessSvg'
import FailSvg from '@/components/FailSvg'

export default function Message(props) {

    let addClass = "border-green-400 bg-green-100"
    let svgComponent = <SuccessSvg />

    { 
        if(props.type !== "success") {
            addClass = "border-red-400 bg-red-100"
            svgComponent = <FailSvg />
        } 
    }

    return (
        <div className={`flex justify-start border ${addClass} rounded-md p-5 mb-10`}>
            <div className=''>
                {svgComponent}
            </div>
            <div className='ml-5'>
                <span className='bold text-lg'>{props.text}</span>
            </div>
        </div>
    )
}