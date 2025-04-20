import AdminNavbar from '@/src/app/admin/_components/AdminNavbar'

export const dynamic = "force-dynamic"

const Adminlayout = ({ children, }) => {
  return <>
    <AdminNavbar/>
    <div className='m-10'>{children}</div>
  </>
}

export default Adminlayout