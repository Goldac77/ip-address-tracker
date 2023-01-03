function Data(props) {
    return (
        <div className="main-div">
            <div className="ip--address">
                <h3>IP ADDRESS</h3>
                {props.ip}
            </div>
            <div className="location">
                <h3>LOCATION</h3>
                {props.region},{props.country}
            </div>
            <div className="timezone">
                <h3>TIMEZONE</h3>
                UTC{props.timezone}
            </div>
            <div className="isp">
                <h3>ISP</h3>
                {props.isp}
            </div>
        </div>
    )
}

export default Data