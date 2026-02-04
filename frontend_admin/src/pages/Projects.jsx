import React, { useState } from 'react'
import DesktopHeader from '../components/layout/DesktopHeader'
import MobileHeader from '../components/layout/MobileHeader'
import Sidebar from '../components/layout/Sidebar'
import Footer from '../components/layout/Footer'
import { FaPlus, FaEdit, FaTrash, FaFolder } from 'react-icons/fa'
import { HiViewGrid } from 'react-icons/hi'

const Projects = () => {

  // Categories state
  const [categories, setCategories] = useState([
    { id: 1, name: { en: "Education", hi: "शिक्षा" }, icon: "📚" },
    { id: 2, name: { en: "Environment", hi: "पर्यावरण" }, icon: "🌿" },
    { id: 3, name: { en: "Social Welfare", hi: "समाज कल्याण" }, icon: "🤝" },
  ])

  const [activeCategory, setActiveCategory] = useState(1)

  // Projects state
  const [projects, setProjects] = useState([])

  // Modal states
  const [showProjectModal, setShowProjectModal] = useState(false)
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [editIndex, setEditIndex] = useState(null)
  const [editCategoryIndex, setEditCategoryIndex] = useState(null)

  // Form states
  const emptyProjectForm = {
    image: "",
    title: { en: "", hi: "" },
    description: { en: "", hi: "" },
    categoryId: 1,
    status: "ongoing",
    featured: false
  }

  const emptyCategoryForm = {
    name: { en: "", hi: "" },
    icon: "📁"
  }

  const [projectForm, setProjectForm] = useState(emptyProjectForm)
  const [categoryForm, setCategoryForm] = useState(emptyCategoryForm)

  // Project handlers
  const openAddProject = () => {
    setProjectForm({ ...emptyProjectForm, categoryId: activeCategory })
    setEditIndex(null)
    setShowProjectModal(true)
  }

  const openEditProject = (index) => {
    const projectsInCategory = projects.filter(p => p.categoryId === activeCategory)
    const project = projectsInCategory[index]
    const actualIndex = projects.findIndex(p => p === project)
    setProjectForm(project)
    setEditIndex(actualIndex)
    setShowProjectModal(true)
  }

  const handleProjectImageChange = (e) => {
    const file = e.target.files[0]
    if (!file) return
    const preview = URL.createObjectURL(file)
    setProjectForm({ ...projectForm, image: preview })
  }

  const handleSaveProject = () => {
    if (editIndex !== null) {
      const updated = [...projects]
      updated[editIndex] = projectForm
      setProjects(updated)
    } else {
      setProjects([...projects, projectForm])
    }
    setShowProjectModal(false)
  }

  const handleDeleteProject = (index) => {
    const projectsInCategory = projects.filter(p => p.categoryId === activeCategory)
    const project = projectsInCategory[index]
    setProjects(projects.filter(p => p !== project))
  }

  // Category handlers
  const openAddCategory = () => {
    setCategoryForm(emptyCategoryForm)
    setEditCategoryIndex(null)
    setShowCategoryModal(true)
  }

  const handleSaveCategory = () => {
    if (editCategoryIndex !== null) {
      const updated = [...categories]
      updated[editCategoryIndex] = { ...categoryForm, id: categories[editCategoryIndex].id }
      setCategories(updated)
    } else {
      const newId = Math.max(...categories.map(c => c.id), 0) + 1
      setCategories([...categories, { ...categoryForm, id: newId }])
    }
    setShowCategoryModal(false)
  }

  const truncateText = (text, limit = 120) => {
    return text.length > limit ? text.substring(0, limit) + "..." : text
  }

  const currentCategoryProjects = projects.filter(p => p.categoryId === activeCategory)
  const currentCategory = categories.find(c => c.id === activeCategory)

  return (
    <div className='min-h-dvh flex bg-amber-100'>
      <div className='h-dvh sticky top-0 w-64 overflow-hidden max-md:hidden'>
        <Sidebar />
      </div>
      <div className='flex-1'>
        <div className='max-md:hidden'>
          <DesktopHeader heading={"Projects"} />
        </div>
        <div className='md:hidden'>
          <MobileHeader heading={"Projects"} />
        </div>
        <div className='min-h-[92.5dvh] p-4'>
          <div className='flex gap-6 max-lg:flex-col'>

            {/* Categories Sidebar */}
            <div className='lg:w-64 flex-shrink-0'>
              <div className='flex items-center justify-between mb-4'>
                <h2 className='text-amber-700 font-semibold uppercase tracking-wide text-sm'>Categories</h2>
                <button onClick={openAddCategory} className='text-amber-700 hover:text-amber-800 cursor-pointer'>
                  <FaPlus size={14} />
                </button>
              </div>
              <div className='space-y-2'>
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setActiveCategory(cat.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition cursor-pointer ${activeCategory === cat.id
                        ? 'bg-amber-600 text-white shadow-lg'
                        : 'bg-white hover:bg-amber-50 text-gray-700'
                      }`}
                  >
                    <span className='text-lg'>{cat.icon}</span>
                    <span className='font-medium'>{cat.name.en}</span>
                    {activeCategory === cat.id && (
                      <span className='ml-auto w-2 h-2 bg-white rounded-full'></span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div className='flex-1'>
              <div className='flex flex-wrap gap-4 justify-between items-center mb-6'>
                <h1 className='text-2xl font-bold text-gray-800'>
                  {currentCategory?.name.en} Projects
                </h1>
                <button onClick={openAddProject}
                  className='cursor-pointer flex gap-2 items-center bg-amber-700 text-white px-4 py-2 rounded-lg hover:bg-amber-800 transition'>
                  <FaPlus />
                  <span>Add Project</span>
                </button>
              </div>

              {/* Projects List */}
              <div className='space-y-4'>
                {currentCategoryProjects.map((project, index) => (
                  <div key={index} className='bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition'>
                    <div className='flex gap-4 p-4 max-sm:flex-col'>
                      {/* Image Thumbnail */}
                      <div className='w-40 h-28 min-w-40 max-sm:w-full max-sm:h-40 rounded-xl overflow-hidden'>
                        <img src={project.image} className='w-full h-full object-cover' alt={project.title.en} />
                      </div>
                      {/* Content */}
                      <div className='flex-1 min-w-0'>
                        <div className='flex items-start justify-between gap-2'>
                          <h2 className='font-bold text-lg text-gray-800'>
                            {project.title.en}
                          </h2>
                          <div className='flex gap-3 flex-shrink-0'>
                            <button className='text-gray-400 hover:text-gray-600 cursor-pointer'>
                              <HiViewGrid size={18} />
                            </button>
                            <button onClick={() => openEditProject(index)} className='text-gray-400 hover:text-blue-600 cursor-pointer'>
                              <FaEdit size={16} />
                            </button>
                            <button onClick={() => handleDeleteProject(index)} className='text-gray-400 hover:text-red-600 cursor-pointer'>
                              <FaTrash size={16} />
                            </button>
                          </div>
                        </div>
                        <p className='text-gray-600 text-sm mt-2 line-clamp-2'>
                          {truncateText(project.description.en)}
                        </p>
                        <div className='flex gap-2 mt-3'>
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${project.status === 'ongoing'
                              ? 'text-amber-700 border-amber-300 bg-amber-50'
                              : 'text-green-700 border-green-300 bg-green-50'
                            }`}>
                            {project.status === 'ongoing' ? 'ONGOING' : 'COMPLETED'}
                          </span>
                          {project.featured && (
                            <span className='px-3 py-1 text-xs font-semibold rounded-full border text-gray-600 border-gray-300 bg-gray-50'>
                              FEATURED
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Empty State */}
              {currentCategoryProjects.length === 0 && (
                <div className='mt-12 text-center text-gray-500'>
                  <FaFolder size={48} className='mx-auto text-gray-300 mb-4' />
                  <p className='text-lg'>No projects in this category.</p>
                  <p className='text-sm'>Click "Add Project" to create your first project.</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <Footer />
      </div>

      {/* Project Modal */}
      {showProjectModal && (
        <div className='fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50'>
          <div className='bg-white rounded-4xl p-6 w-full max-w-lg space-y-3 max-h-[90vh] overflow-y-auto'>
            <h2 className='font-bold text-lg'>
              {editIndex !== null ? "Edit Project" : "Add Project"}
            </h2>

            {/* Image Upload */}
            <div>
              <label className='text-sm text-gray-600 mb-1 block'>Project Image</label>
              <input
                type="file"
                accept="image/*"
                className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none'
                onChange={handleProjectImageChange}
              />
            </div>
            {projectForm.image && (
              <img src={projectForm.image} className='h-40 w-full object-cover rounded-2xl' alt="Preview" />
            )}

            {/* Category */}
            <div>
              <label className='text-sm text-gray-600 mb-1 block'>Category</label>
              <select
                className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none'
                value={projectForm.categoryId}
                onChange={(e) => setProjectForm({ ...projectForm, categoryId: parseInt(e.target.value) })}
              >
                {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name.en}</option>
                ))}
              </select>
            </div>

            {/* Title English */}
            <div>
              <label className='text-sm text-gray-600 mb-1 block'>Title (English)</label>
              <input
                placeholder='Enter project title in English'
                className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none'
                value={projectForm.title.en}
                onChange={(e) =>
                  setProjectForm({ ...projectForm, title: { ...projectForm.title, en: e.target.value } })
                }
              />
            </div>

            {/* Title Hindi */}
            <div>
              <label className='text-sm text-gray-600 mb-1 block'>Title (Hindi)</label>
              <input
                placeholder='प्रोजेक्ट शीर्षक हिंदी में दर्ज करें'
                className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none'
                value={projectForm.title.hi}
                onChange={(e) =>
                  setProjectForm({ ...projectForm, title: { ...projectForm.title, hi: e.target.value } })
                }
              />
            </div>

            {/* Description English */}
            <div>
              <label className='text-sm text-gray-600 mb-1 block'>Description (English)</label>
              <textarea
                placeholder='Enter project description in English'
                className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none resize-none'
                value={projectForm.description.en}
                rows={4}
                onChange={(e) =>
                  setProjectForm({ ...projectForm, description: { ...projectForm.description, en: e.target.value } })
                }
              />
            </div>

            {/* Description Hindi */}
            <div>
              <label className='text-sm text-gray-600 mb-1 block'>Description (Hindi)</label>
              <textarea
                placeholder='प्रोजेक्ट विवरण हिंदी में दर्ज करें'
                className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none resize-none'
                value={projectForm.description.hi}
                rows={4}
                onChange={(e) =>
                  setProjectForm({ ...projectForm, description: { ...projectForm.description, hi: e.target.value } })
                }
              />
            </div>

            {/* Status and Featured */}
            <div className='flex gap-4'>
              <div className='flex-1'>
                <label className='text-sm text-gray-600 mb-1 block'>Status</label>
                <select
                  className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none'
                  value={projectForm.status}
                  onChange={(e) => setProjectForm({ ...projectForm, status: e.target.value })}
                >
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
              <div className='flex items-center gap-2 pt-6'>
                <input
                  type="checkbox"
                  id="featured"
                  checked={projectForm.featured}
                  onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })}
                  className='w-4 h-4 accent-amber-600 cursor-pointer'
                />
                <label htmlFor="featured" className='text-sm text-gray-700 cursor-pointer'>Featured</label>
              </div>
            </div>

            {/* Action Buttons */}
            <div className='flex justify-end gap-3 pt-2'>
              <button onClick={() => setShowProjectModal(false)} className='px-4 py-2 border rounded-2xl cursor-pointer hover:bg-gray-200 transition'>
                Cancel
              </button>
              <button onClick={handleSaveProject}
                className='cursor-pointer bg-amber-700 text-white px-4 py-2 rounded-2xl hover:bg-amber-800 transition active:scale-95'>
                {editIndex !== null ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Category Modal */}
      {showCategoryModal && (
        <div className='fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50'>
          <div className='bg-white rounded-4xl p-6 w-full max-w-md space-y-3'>
            <h2 className='font-bold text-lg'>
              {editCategoryIndex !== null ? "Edit Category" : "Add Category"}
            </h2>

            {/* Icon */}
            <div>
              <label className='text-sm text-gray-600 mb-1 block'>Icon (Emoji)</label>
              <input
                placeholder='📁'
                className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none text-2xl'
                value={categoryForm.icon}
                onChange={(e) => setCategoryForm({ ...categoryForm, icon: e.target.value })}
              />
            </div>

            {/* Name English */}
            <div>
              <label className='text-sm text-gray-600 mb-1 block'>Name (English)</label>
              <input
                placeholder='Enter category name in English'
                className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none'
                value={categoryForm.name.en}
                onChange={(e) =>
                  setCategoryForm({ ...categoryForm, name: { ...categoryForm.name, en: e.target.value } })
                }
              />
            </div>

            {/* Name Hindi */}
            <div>
              <label className='text-sm text-gray-600 mb-1 block'>Name (Hindi)</label>
              <input
                placeholder='श्रेणी का नाम हिंदी में दर्ज करें'
                className='w-full px-3 py-2 bg-gray-50 border border-yellow-400 rounded-2xl focus:ring-2 focus:ring-amber-500 outline-none'
                value={categoryForm.name.hi}
                onChange={(e) =>
                  setCategoryForm({ ...categoryForm, name: { ...categoryForm.name, hi: e.target.value } })
                }
              />
            </div>

            {/* Action Buttons */}
            <div className='flex justify-end gap-3 pt-2'>
              <button onClick={() => setShowCategoryModal(false)} className='px-4 py-2 border rounded-2xl cursor-pointer hover:bg-gray-200 transition'>
                Cancel
              </button>
              <button onClick={handleSaveCategory}
                className='cursor-pointer bg-amber-700 text-white px-4 py-2 rounded-2xl hover:bg-amber-800 transition active:scale-95'>
                {editCategoryIndex !== null ? "Update" : "Create"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Projects