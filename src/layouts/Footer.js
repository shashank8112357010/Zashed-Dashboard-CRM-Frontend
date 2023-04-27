import React, { useState } from 'react';

const Footer = () => {
  const [ date , setDate] = useState(new Date().getFullYear())
  return (
    <footer class="footer">
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-6">
                 © Zashed.
            </div>
            <div class="col-sm-6">
                <div class="text-sm-end d-none d-sm-block">
                   {date} Design & Develop by Shashank Sharma
                </div>
            </div>
        </div>
    </div>
</footer>
  )
}

export default Footer;