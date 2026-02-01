import { 
  LucideImage, LucideType, LucideCalendar, LucidePlus,LucideUtensils,LucideMapPin,
  LucideHeart, LucideSmile, LucideCheckCircle, LucideLoader, LucideLock,LucideMusic,LucideCamera,
} from 'lucide-react';
import { useState } from 'react';
import GenerateLinkAndQr from '../../components/GenerateLinkAndQr';
import { addValentineData } from '../../repositiories/ValentineRepositories';
const ValentinesSpecialForms = ({config, setConfig}) => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        
        if (!config.passcode || config.passcode.length < 4) {
            newErrors.passcode = 'Passcode must be 4 characters';
        }
        if (!config.anniversaryDate) {
            newErrors.anniversaryDate = 'Anniversary date is required';
        }
        if (config.memories.some(m => !m.img)) {
            newErrors.memories = 'All 3 memory images are required';
        }
        if (config.memories.some(m => !m.note.trim())) {
            newErrors.memoryNotes = 'All memory descriptions are required';
        }
        if (!config.letterBody.trim()) {
            newErrors.letterBody = 'Love letter is required';
        }
        if (!config.invitationDate) {
            newErrors.invitationDate = 'Invitation date is required';
        }
        if (!config.invitationType) {
            newErrors.invitationType = 'Date type is required';
        }
        if (!config.invitationLocation.trim()) {
            newErrors.invitationLocation = 'Location is required';
        }
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async() => {
        if (!validateForm())return;
        try{
            setIsSubmitting(true);
            await addValentineData(config);
            setIsModalOpen(true);
        }catch(e){
            console.error("Error submitting Valentine form:", e);
        }finally{
            setIsSubmitting(false);
        }
    };

    const handleImageUpload = (index, e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                const updatedMemories = [...config.memories];
                updatedMemories[index].img = reader.result;
                setConfig({ ...config, memories: updatedMemories });
            };
            reader.readAsDataURL(file);
        }
    }
    const updateMemory = (index, value) => {
        const updatedMemories = [...config.memories];
        updatedMemories[index].note = value;
        setConfig({ ...config, memories: updatedMemories });
    }
    return(
    <>
        <div className="mb-8">
            <h1 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
            <LucideHeart className="text-rose-500" fill="currentColor" /> Valentine's Designer
            </h1>
            <p className="text-slate-500 text-sm italic">Craft your digital romantic journey.</p>
        </div>

        <div className="space-y-8">
            
            {/* SECTION: ACCESS & MUSIC */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-600 flex items-center gap-2">
                <LucideLock size={14} /> Secret Passcode
                </label>
                <input
                type="text"
                placeholder="e.g. 2023"
                maxLength={4}
                className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-rose-200 outline-none transition-all font-mono text-slate-800 placeholder:text-slate-400 ${errors.passcode ? 'border-red-500 bg-red-50' : ''}`}
                value={config.passcode}
                onChange={(e) => setConfig({ ...config, passcode: e.target.value })}
                />
                {errors.passcode && <p className="text-xs text-red-500 font-semibold">{errors.passcode}</p>}
            </div>
            <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-widest text-slate-600 flex items-center gap-2">
                <LucideCalendar size={14} /> Anniversary
                </label>
                <input
                type="date"
                className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-rose-200 outline-none transition-all text-slate-800 ${errors.anniversaryDate ? 'border-red-500 bg-red-50' : ''}`}
                value={config.anniversaryDate}
                onChange={(e) => setConfig({ ...config, anniversaryDate: e.target.value })}
                />
                {errors.anniversaryDate && <p className="text-xs text-red-500 font-semibold">{errors.anniversaryDate}</p>}
            </div>
            </div>

            {/* SECTION: MUSIC URL */}
            <div className="space-y-2">
            <label className="text-xs font-black uppercase tracking-widest text-slate-600 flex items-center gap-2">
                <LucideMusic size={14} /> Background Music (MP3 Link)
            </label>
            <input
                type="text"
                placeholder="Direct audio link..."
                className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-rose-200 outline-none italic text-slate-800 placeholder:text-slate-400"
                value={config.audioUrl}
                onChange={(e) => setConfig({ ...config, audioUrl: e.target.value })}
            />
            </div>

            {/* SECTION: MEMORY CAROUSEL */}
            <div className="space-y-4">
            <label className="text-xs font-black uppercase tracking-widest text-slate-600 flex items-center gap-2">
                <LucideCamera size={14} /> Captured Moments (Carousel)
            </label>
            {(errors.memories || errors.memoryNotes) && <p className="text-xs text-red-500 font-semibold">{errors.memories || errors.memoryNotes}</p>}
            <div className="grid gap-4">
                {config.memories.map((mem, idx) => (
                <div key={idx} className="p-4 border-2 border-dashed border-rose-100 rounded-2xl bg-rose-50/30 flex flex-col md:flex-row gap-4">
                    <div className="w-full md:w-32 h-32 bg-white rounded-xl border overflow-hidden relative flex items-center justify-center">
                    {mem.img ? (
                        <img src={mem.img} className="w-full h-full object-cover" alt="Preview" />
                    ) : (
                        <label className="cursor-pointer text-rose-300 hover:text-rose-500">
                        <LucidePlus size={32} />
                        <input type="file" className="hidden" onChange={(e) => handleImageUpload(idx, e)} />
                        </label>
                    )}
                    </div>
                    <div className="flex-1">
                    <textarea
                        placeholder="Describe this memory..."
                        className="w-full h-full p-3 bg-white border rounded-xl text-sm italic resize-none outline-none focus:ring-2 focus:ring-rose-200 text-slate-800 placeholder:text-slate-400"
                        value={mem.note}
                        onChange={(e) => updateMemory(idx, e.target.value)}
                    />
                    </div>
                </div>
                ))}
            </div>
            </div>

            {/* SECTION: THE LETTER */}
            <div className="space-y-4">
            <label className="text-xs font-black uppercase tracking-widest text-slate-600 flex items-center gap-2">
                <LucideType size={14} /> Your Love Letter
            </label>
            <textarea 
                rows={5}
                placeholder="Write your heart out..."
                className={`w-full p-4 border rounded-2xl focus:ring-2 focus:ring-rose-200 outline-none italic text-slate-800 bg-slate-50/50 placeholder:text-slate-400 ${errors.letterBody ? 'border-red-500 bg-red-50' : ''}`}
                value={config.letterBody}
                onChange={(e) => setConfig({...config, letterBody: e.target.value})}
            />
            {errors.letterBody && <p className="text-xs text-red-500 font-semibold">{errors.letterBody}</p>}
            </div>

            {/* SECTION: FINAL INVITATION */}
            <div className="p-6 bg-rose-900 rounded-[2rem] text-white space-y-4 shadow-xl">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-rose-300 flex items-center gap-2">
                <LucideUtensils size={14} /> The Grand Invitation
            </label>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                <LucideCalendar className="absolute left-3 top-3 text-rose-400" size={18} />
                <input 
                    type="date"
                    className={`w-full pl-10 pr-3 py-3 rounded-xl bg-white/10 border text-sm outline-none focus:bg-white/20 text-white ${errors.invitationDate ? 'border-red-400 bg-red-900/20' : 'border-white/20'}`}
                    value={config.invitationDate}
                    onChange={(e) => setConfig({...config, invitationDate: e.target.value})}
                />
                </div>
                <div className="relative">
                <LucideUtensils className="absolute left-3 top-3 text-rose-400" size={18} />
                <select 
                    className={`w-full pl-10 pr-3 py-3 rounded-xl bg-white/10 border text-sm outline-none appearance-none cursor-pointer focus:bg-white/20 text-white ${errors.invitationType ? 'border-red-400 bg-red-900/20' : 'border-white/20'}`}
                    value={config.invitationType}
                    onChange={(e) => setConfig({...config, invitationType: e.target.value})}
                >
                    <option value="" className="text-slate-900">Select Date Type</option>
                    <option value="Romantic Dinner" className="text-slate-900">Romantic Dinner 🍽️</option>
                    <option value="Sunset Picnic" className="text-slate-900">Sunset Picnic 🧺</option>
                    <option value="Stargazing" className="text-slate-900">Stargazing ⭐</option>
                </select>
                </div>
            </div>
            {(errors.invitationDate || errors.invitationType) && <p className="text-xs text-red-300 font-semibold">{errors.invitationDate || errors.invitationType}</p>}
            <div className="relative">
                <LucideMapPin className="absolute left-3 top-3 text-rose-400" size={18} />
                <input 
                type="text"
                placeholder="Where? (e.g. Our Special Spot)"
                className={`w-full pl-10 pr-3 py-3 rounded-xl bg-white/10 border text-sm outline-none focus:bg-white/20 text-white placeholder:text-rose-200 ${errors.invitationLocation ? 'border-red-400 bg-red-900/20' : 'border-white/20'}`}
                value={config.invitationLocation}
                onChange={(e) => setConfig({...config, invitationLocation: e.target.value})}
                />
                {errors.invitationLocation && <p className="text-xs text-red-300 font-semibold mt-2">{errors.invitationLocation}</p>}
            </div>
            </div>

            {/* SUBMIT BUTTON */}
            <button 
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`w-full py-5 rounded-full font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${
                isSubmitting
                ? 'bg-slate-400 text-white cursor-not-allowed'
                : 'bg-[#FF85A1] text-white hover:bg-[#ff6b8e] active:scale-95'
            }`}
            >
            {isSubmitting ? (
                <><LucideLoader size={20} className="animate-spin" /> Preparing Magic...</>
            ) : (
                <><LucideCheckCircle size={20} /> Generate My Valentine Page</>
            )}
            </button>
        </div>
        {/* Generate Link Modal */}
      <GenerateLinkAndQr 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        type="valentine" 
      />
    </>
    )
}
export default ValentinesSpecialForms;