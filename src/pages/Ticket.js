import React from 'react'
import CommingSoon from '../common/CommingSoon'

const Ticket = () => {
    const array=["mohit" , "vinay" ,{name:"shashank"}]
  return (
    <div className="main-content">
    <div className="page-content">
        <div className="container-fluid">
            {/* <!-- start page title --> */}
            <div className="row">
                <div className="col-12">
                    <div className="page-title-box d-sm-flex align-items-center justify-content-between">
                        <h4 className="mb-sm-0 font-size-18">Ticket</h4>
    
                       

                    </div>
                </div>
            </div>
            <CommingSoon  text="Tickt comming soon" shashank={array}/>
        </div>
    </div>


</div>
  )
}

export default Ticket