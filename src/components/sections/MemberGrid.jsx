import GoldFrame from '../ui/GoldFrame'
import { members } from '../../data/members'

function MemberGrid() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-6 py-12">
      {members.map((m) => (
        <GoldFrame key={m.id} image={m.image} name={m.name} />
      ))}
    </div>
  )
}
export default MemberGrid
