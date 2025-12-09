import './profile.css'

export default function Profil () {


    return (
        <div>
            <h2 className='pseudo'>@pseudo</h2>
            <div className="card">
            <p>dernier post le (date)</p>
            <p>message</p>
            </div>
            <p>number (logo)</p>
            <p className='post'>liste de post</p>
        </div>
    )
}