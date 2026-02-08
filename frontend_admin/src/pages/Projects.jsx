import React, { useEffect, useState } from 'react'
import DesktopHeader from '../components/layout/DesktopHeader'
import MobileHeader from '../components/layout/MobileHeader'
import Sidebar from '../components/layout/Sidebar'
import Footer from '../components/layout/Footer'
import { FaPlus, FaEdit, FaTrash, FaFolder } from 'react-icons/fa'
import { HiViewGrid } from 'react-icons/hi'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from 'react-redux'
import { addProjectCategory, deleteProjectCategory, addProject, deleteProject, updateProject } from '../functions/projects'

const Projects = () => {
  const dispatch = useDispatch()
  const categories = useSelector(state => state.projectCategories)
  const projects = useSelector(state => state.projects)
  const [activeCategory, setActiveCategory] = useState(null)
  useEffect(() => {
    if (categories.length > 0 && !activeCategory) {
      setActiveCategory(categories[0]._id)
    }
  }, [categories, activeCategory])

  // Modal states
  const [showProjectModal, setShowProjectModal] = useState(false)
  const [showCategoryModal, setShowCategoryModal] = useState(false)
  const [editIndex, setEditIndex] = useState(null)

  // Form states
  const emptyProjectForm = {
    image: "",
    preview: "",
    title: { en: "", hi: "" },
    description: { en: "", hi: "" },
    featured: false
  }

  const emptyCategoryForm = {
    name: { en: "", hi: "" }
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
    const project = projects[index]
    setProjectForm(project)
    setEditIndex(project._id)
    setShowProjectModal(true)
  }

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setProjectForm(prev => ({
      ...prev,
      image: file,
      preview: URL.createObjectURL(file),
    }));
  };

  const handleSaveProject = async () => {
    if(!projectForm.title.en.trim() && !projectForm.title.hi.trim()) return toast.error("Either English or Hindi title is required");
    if(!projectForm.description.en.trim() && !projectForm.description.hi.trim()) return toast.error("Either English or Hindi description is required");
    if(!projectForm.image) return toast.error("Project image is required");
    if(!activeCategory) return toast.error("Project category is required");
    try {
      const formData = new FormData();
      formData.append("title", JSON.stringify(projectForm.title));
      formData.append("description", JSON.stringify(projectForm.description));
      formData.append("category", activeCategory);
      formData.append("featured", projectForm.featured);
      if (projectForm.image instanceof File) {
        formData.append("image", projectForm.image);
      }
      if (editIndex !== null) {
        await dispatch(updateProject(editIndex, formData))
      }
      else {
        await dispatch(addProject(formData))
      }
    } catch (err) {
      toast.error(err.response?.data?.msg || "Failed to save project")
    } finally {
      setShowProjectModal(false)
    }
  }

  const handleDeleteProject = async (id) => {
    try {
      await dispatch(deleteProject(id))
    } catch (err) {
      toast.error(err.response?.data?.msg || "Failed to delete project")
    }
  }

  // Category handlers
  const openAddCategory = () => {
    setCategoryForm(emptyCategoryForm)
    setShowCategoryModal(true)
  }

  const handleSaveCategory = async () => {
    try {
      if (!categoryForm.name.en.trim() || !categoryForm.name.hi.trim()) return toast.error("Both English and Hindi names are required")
      const name = JSON.stringify({ en: categoryForm.name.en.trim(), hi: categoryForm.name.hi.trim() })
      await dispatch(addProjectCategory({ name }))
    } catch (err) {
      toast.error(err.response?.data?.msg || "Failed to add category")
    } finally {
      setShowCategoryModal(false)
    }
  }

  const truncateText = (text, limit = 120) => {
    return text.length > limit ? text.substring(0, limit) + "..." : text
  }

  const currentCategoryProjects = projects.filter(p => p.category === activeCategory)
  const currentCategory = categories.find(c => c._id === activeCategory)

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
            <div className='lg:w-64 shrink-0'>
              <div className='flex items-center justify-between mb-4'>
                <h2 className='text-amber-700 font-semibold uppercase tracking-wide text-sm'>Categories</h2>
                <button onClick={openAddCategory} className='text-amber-700 hover:text-amber-800 cursor-pointer'>
                  <FaPlus size={14} />
                </button>
              </div>
              <div className='space-y-2'>
                {categories.map((cat) => (
                  <button
                    key={cat._id}
                    onClick={() => setActiveCategory(cat._id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition cursor-pointer ${activeCategory === cat._id
                        ? 'bg-amber-600 text-white shadow-lg'
                        : 'bg-white hover:bg-amber-50 text-gray-700'
                      }`}
                  >
                    <FaFolder size={18} />
                    <div className='flex flex-col text-xs text-left'>
                      <span className='font-medium'>{cat.name.en}</span>
                      <span className='font-medium'>{cat.name.hi}</span>
                    </div>
                    <div className='ml-auto flex items-center gap-2'>
                      {activeCategory === cat._id && (
                        <span className='w-2 h-2 bg-white rounded-full'></span>
                      )}

                      <FaTrash
                        size={14}
                        onClick={(e) => {
                          e.stopPropagation();
                          dispatch(deleteProjectCategory(cat._id))
                        }}
                      />
                    </div>
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
                  <div key={index} className='bg-white rounded-4xl shadow-lg overflow-hidden hover:shadow-xl transition'>
                    <div className='flex gap-4 p-4 max-sm:flex-col'>
                      {/* Image Thumbnail */}
                      <div className='w-40 h-28 min-w-40 max-sm:w-full max-sm:h-40 rounded-2xl overflow-hidden'>
                        <img src={import.meta.env.VITE_UPLOADS + project.image} className='w-full h-full object-cover' alt={project.title.en} />
                      </div>
                      {/* Content */}
                      <div className='flex-1 min-w-0'>
                        <div className='flex items-start justify-between gap-2'>
                          <div className='flex items-start gap-2'>
                            <div>
                              <h2 className='font-bold text-gray-800'>{project.title.en}</h2>
                              <h2 className='font-bold text-gray-800'>{project.title.hi}</h2>
                            </div>

                            {project.featured && (
                              <span className='px-2 py-0.5 text-[10px] font-semibold rounded-md border text-amber-700 border-amber-200 bg-amber-50 whitespace-nowrap'>
                                FEATURED
                              </span>
                            )}
                          </div>
                          <div className='flex gap-3 shrink-0'>
                            <button className='text-gray-400 hover:text-gray-600 cursor-pointer'>
                              <HiViewGrid size={18} />
                            </button>
                            <button onClick={() => openEditProject(index)} className='text-gray-400 hover:text-blue-600 cursor-pointer'>
                              <FaEdit size={16} />
                            </button>
                            <button onClick={() => handleDeleteProject(project._id)} className='text-gray-400 hover:text-red-600 cursor-pointer'>
                              <FaTrash size={16} />
                            </button>
                          </div>
                        </div>
                        <p className='text-gray-600 text-sm mt-1'>{truncateText(project.description.en)}</p>
                        <p className='text-gray-600 text-sm mt-1'>{truncateText(project.description.hi)}</p>
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
          <div className='bg-white rounded-4xl p-6 w-full max-w-lg space-y-3 max-h-[90vh] overflow-y-auto hide-scrollbar'>
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
                onChange={handleImageChange}
              />
            </div>
            {projectForm.preview && (
              <img src={projectForm.preview} className='h-40 w-full object-cover rounded-2xl' alt="Preview" />
            )}

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
            <div className='flex items-center gap-2'>
              <input
                type="checkbox"
                id="featured"
                checked={projectForm.featured}
                onChange={(e) => setProjectForm({ ...projectForm, featured: e.target.checked })}
                className='w-4 h-4 accent-amber-600 cursor-pointer'
              />
              <label htmlFor="featured" className='text-sm text-gray-700 cursor-pointer'>Featured</label>
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
            <h2 className='font-bold text-lg'>Add Categor</h2>
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
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Projects