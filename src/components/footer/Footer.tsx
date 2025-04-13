const Footer = () => {
  return (
    <footer>
      <div className='container grid grid-cols-3 py-12 text-center'>
        <p className='col-span-1'>© 2023 Shopee. All rights reserved.</p>
        <p className='col-span-2'>
          Countries & Regions: Singapore Indonesia Taiwan Thailand Malaysia Vietnam Philippines Brazil Mexico Colombia
          Chile Poland
        </p>
      </div>
      <div className='container mt-10'>
        <p className='mt-2'>
          Address: 4th-5th-6th Floor, Capital Place Building, 29 Lieu Giai Street, Ngoc Khanh Ward, Ba Dinh District,
          Hanoi, Vietnam. Support Hotline: 19001221 - Email: cskh@hotro.shopee.vn
        </p>
        <p className='mt-2'>
          Content Management Responsibility: Nguyen Duc Tri - Contact phone: 024 73081221 (ext 4678)
        </p>
        <p className='mt-2'>
          Business registration number: 0106773786 issued by Hanoi Department of Planning & Investment for the first
          time on 10/02/2015
        </p>
        <p className='mt-2'>© 2015 - Copyright belongs to Shopee Co., Ltd.</p>
      </div>
    </footer>
  )
}

export default Footer
