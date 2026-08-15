import React, { useState, useEffect } from 'react'
import { supabase, TABLES } from '../../lib/supabase'
import './admin.css'

const AcademyManager = () => {
  const [courses, setCourses] = useState([])
  const [schedules, setSchedules] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState('courses')
  const [showCourseForm, setShowCourseForm] = useState(false)
  const [showScheduleForm, setShowScheduleForm] = useState(false)
  const [editingCourse, setEditingCourse] = useState(null)
  const [editingSchedule, setEditingSchedule] = useState(null)

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      setLoading(true)
      const [coursesResult, schedulesResult] = await Promise.all([
        supabase.from(TABLES.ACADEMY_COURSES).select('*').order('created_at', { ascending: false }),
        supabase.from(TABLES.COURSE_SCHEDULES).select(`
          *,
          academy_courses (name)
        `).order('start_date', { ascending: true })
      ])

      if (coursesResult.error) throw coursesResult.error
      if (schedulesResult.error) throw schedulesResult.error

      setCourses(coursesResult.data || [])
      setSchedules(schedulesResult.data || [])
    } catch (error) {
      console.error('Error fetching data:', error)
      alert('Error fetching data: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const saveCourse = async (courseData) => {
    try {
      if (editingCourse) {
        // Update existing course
        const { data, error } = await supabase
          .from(TABLES.ACADEMY_COURSES)
          .update({ ...courseData, updated_at: new Date().toISOString() })
          .eq('id', editingCourse.id)
          .select()

        if (error) throw error
        setCourses(prev => prev.map(c => c.id === editingCourse.id ? data[0] : c))
      } else {
        // Create new course
        const { data, error } = await supabase
          .from(TABLES.ACADEMY_COURSES)
          .insert([{
            ...courseData,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }])
          .select()

        if (error) throw error
        setCourses(prev => [data[0], ...prev])
      }

      setShowCourseForm(false)
      setEditingCourse(null)
      alert('Course saved successfully')
    } catch (error) {
      console.error('Save error:', error)
      alert('Save failed: ' + error.message)
    }
  }

  const deleteCourse = async (course) => {
    if (!confirm('Are you sure you want to delete this course? This will also delete all related schedules.')) return

    try {
      // Delete schedules first
      await supabase
        .from(TABLES.COURSE_SCHEDULES)
        .delete()
        .eq('course_id', course.id)

      // Delete course
      const { error } = await supabase
        .from(TABLES.ACADEMY_COURSES)
        .delete()
        .eq('id', course.id)

      if (error) throw error

      setCourses(prev => prev.filter(c => c.id !== course.id))
      setSchedules(prev => prev.filter(s => s.course_id !== course.id))
      alert('Course deleted successfully')
    } catch (error) {
      console.error('Delete error:', error)
      alert('Delete failed: ' + error.message)
    }
  }

  const saveSchedule = async (scheduleData) => {
    try {
      if (editingSchedule) {
        // Update existing schedule
        const { data, error } = await supabase
          .from(TABLES.COURSE_SCHEDULES)
          .update({ ...scheduleData, updated_at: new Date().toISOString() })
          .eq('id', editingSchedule.id)
          .select(`
            *,
            academy_courses (name)
          `)

        if (error) throw error
        setSchedules(prev => prev.map(s => s.id === editingSchedule.id ? data[0] : s))
      } else {
        // Create new schedule
        const { data, error } = await supabase
          .from(TABLES.COURSE_SCHEDULES)
          .insert([{
            ...scheduleData,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          }])
          .select(`
            *,
            academy_courses (name)
          `)

        if (error) throw error
        setSchedules(prev => [data[0], ...prev])
      }

      setShowScheduleForm(false)
      setEditingSchedule(null)
      alert('Schedule saved successfully')
    } catch (error) {
      console.error('Save error:', error)
      alert('Save failed: ' + error.message)
    }
  }

  const deleteSchedule = async (schedule) => {
    if (!confirm('Are you sure you want to delete this schedule?')) return

    try {
      const { error } = await supabase
        .from(TABLES.COURSE_SCHEDULES)
        .delete()
        .eq('id', schedule.id)

      if (error) throw error

      setSchedules(prev => prev.filter(s => s.id !== schedule.id))
      alert('Schedule deleted successfully')
    } catch (error) {
      console.error('Delete error:', error)
      alert('Delete failed: ' + error.message)
    }
  }

  return (
    <div className="admin-layout">
      <header className="admin-header">
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '1.5rem 1.5rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ 
                fontFamily: "'Playfair Display', serif",
                fontSize: '2.25rem', 
                fontWeight: '800', 
                color: '#FFFFFF',
                marginBottom: '0.5rem',
                textShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}>
                Academy Manager
              </h1>
              <p style={{ fontSize: '0.9375rem', color: 'rgba(255,255,255,0.9)', fontWeight: '500' }}>
                Manage courses and schedules ({courses.length} courses, {schedules.length} schedules)
              </p>
            </div>
            <a
              href="/admin/dashboard"
              className="btn-secondary"
              style={{ background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(10px)', color: '#fff', borderColor: 'rgba(255,255,255,0.3)', textDecoration: 'none' }}
            >
              ← Back to Dashboard
            </a>
          </div>
        </div>
      </header>

      <main className="admin-content">
        {/* Tabs */}
        <div style={{ marginBottom: '3rem' }}>
          <h2 className="section-header">Management Sections</h2>
          <div className="admin-card">
            <div style={{ display: 'flex', gap: '1rem', borderBottom: '2px solid var(--gray-100)', paddingBottom: '1rem' }}>
              <button
                onClick={() => setActiveTab('courses')}
                className={activeTab === 'courses' ? 'btn-primary' : 'btn-secondary'}
                style={{ position: 'relative' }}
              >
                <svg style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                Courses ({courses.length})
              </button>
              <button
                onClick={() => setActiveTab('schedules')}
                className={activeTab === 'schedules' ? 'btn-primary' : 'btn-secondary'}
                style={{ position: 'relative' }}
              >
                <svg style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Schedules ({schedules.length})
              </button>
            </div>
          </div>
        </div>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '4rem 0' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem' }}>
              <div className="spinner"></div>
              <p style={{ fontSize: '0.9375rem', color: '#64748B', fontWeight: '500' }}>
                Loading academy data...
              </p>
            </div>
          </div>
        ) : (
          <div>
            {activeTab === 'courses' && (
              <CoursesTab
                courses={courses}
                showForm={showCourseForm}
                setShowForm={setShowCourseForm}
                editingCourse={editingCourse}
                setEditingCourse={setEditingCourse}
                onSave={saveCourse}
                onDelete={deleteCourse}
              />
            )}
            {activeTab === 'schedules' && (
              <SchedulesTab
                schedules={schedules}
                courses={courses}
                showForm={showScheduleForm}
                setShowForm={setShowScheduleForm}
                editingSchedule={editingSchedule}
                setEditingSchedule={setEditingSchedule}
                onSave={saveSchedule}
                onDelete={deleteSchedule}
              />
            )}
          </div>
        )}
      </main>
    </div>
  )
}

const CoursesTab = ({ courses, showForm, setShowForm, editingCourse, setEditingCourse, onSave, onDelete }) => {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 className="section-header" style={{ marginBottom: 0 }}>Academy Courses</h2>
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary"
        >
          <svg style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Course
        </button>
      </div>

      {showForm && (
        <div className="fade-in-up" style={{ marginBottom: '3rem' }}>
          <CourseForm
            course={editingCourse}
            onSave={onSave}
            onCancel={() => {
              setShowForm(false)
              setEditingCourse(null)
            }}
          />
        </div>
      )}

      {courses.length === 0 ? (
        <div className="admin-card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <div className="stat-icon stat-icon-gold" style={{ width: '80px', height: '80px', margin: '0 auto 1.5rem' }}>
            <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
          </div>
          <h3 style={{ 
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.5rem', 
            fontWeight: '700', 
            color: '#0F172A',
            marginBottom: '0.5rem'
          }}>
            No courses yet
          </h3>
          <p style={{ fontSize: '0.9375rem', color: '#64748B', marginBottom: '2rem' }}>
            Create your first academy course to get started
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="btn-primary"
          >
            Create First Course
          </button>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
          {courses.map((course, index) => (
            <div key={course.id} className="fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <CourseCard
                course={course}
                onEdit={() => {
                  setEditingCourse(course)
                  setShowForm(true)
                }}
                onDelete={() => onDelete(course)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const SchedulesTab = ({ schedules, courses, showForm, setShowForm, editingSchedule, setEditingSchedule, onSave, onDelete }) => {
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2 className="section-header" style={{ marginBottom: 0 }}>Course Schedules</h2>
        <button
          onClick={() => setShowForm(true)}
          className="btn-primary"
        >
          <svg style={{ width: '1.25rem', height: '1.25rem', marginRight: '0.5rem' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
          Add Schedule
        </button>
      </div>

      {showForm && (
        <div className="fade-in-up" style={{ marginBottom: '3rem' }}>
          <ScheduleForm
            schedule={editingSchedule}
            courses={courses}
            onSave={onSave}
            onCancel={() => {
              setShowForm(false)
              setEditingSchedule(null)
            }}
          />
        </div>
      )}

      {schedules.length === 0 ? (
        <div className="admin-card" style={{ textAlign: 'center', padding: '4rem 2rem' }}>
          <div className="stat-icon stat-icon-blue" style={{ width: '80px', height: '80px', margin: '0 auto 1.5rem' }}>
            <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <h3 style={{ 
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.5rem', 
            fontWeight: '700', 
            color: '#0F172A',
            marginBottom: '0.5rem'
          }}>
            No schedules yet
          </h3>
          <p style={{ fontSize: '0.9375rem', color: '#64748B', marginBottom: '2rem' }}>
            Create course schedules to start accepting enrollments
          </p>
          <button
            onClick={() => setShowForm(true)}
            className="btn-primary"
          >
            Create First Schedule
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {schedules.map((schedule, index) => (
            <div key={schedule.id} className="fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
              <ScheduleCard
                schedule={schedule}
                onEdit={() => {
                  setEditingSchedule(schedule)
                  setShowForm(true)
                }}
                onDelete={() => onDelete(schedule)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

const CourseForm = ({ course, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    name: course?.name || '',
    description: course?.description || '',
    duration: course?.duration || '',
    price: course?.price || '',
    features: course?.features?.join('\n') || '',
    status: course?.status || 'active'
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({
      ...formData,
      price: parseFloat(formData.price),
      features: formData.features.split('\n').filter(f => f.trim())
    })
  }

  return (
    <div className="admin-card">
      <h3 style={{ 
        fontFamily: "'Playfair Display', serif",
        fontSize: '1.5rem', 
        fontWeight: '700', 
        color: '#0F172A',
        marginBottom: '1.5rem'
      }}>
        {course ? 'Edit Course' : 'Add New Course'}
      </h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
              Course Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
              className="admin-input"
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
              Duration *
            </label>
            <input
              type="text"
              required
              placeholder="e.g., 3 weeks, 6 months"
              value={formData.duration}
              onChange={(e) => setFormData(prev => ({ ...prev, duration: e.target.value }))}
              className="admin-input"
            />
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
              Price (₹) *
            </label>
            <input
              type="number"
              required
              min="0"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
              className="admin-input"
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
              className="admin-select"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
            Description *
          </label>
          <textarea
            required
            rows="3"
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            className="admin-textarea"
          />
        </div>
        <div>
          <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
            Features (one per line)
          </label>
          <textarea
            rows="4"
            placeholder="Feature 1&#10;Feature 2&#10;Feature 3"
            value={formData.features}
            onChange={(e) => setFormData(prev => ({ ...prev, features: e.target.value }))}
            className="admin-textarea"
          />
        </div>
        <div style={{ display: 'flex', gap: '1rem', paddingTop: '1rem' }}>
          <button
            type="submit"
            className="btn-primary"
            style={{ flex: 1 }}
          >
            {course ? 'Update Course' : 'Create Course'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="btn-secondary"
            style={{ flex: 1 }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

const CourseCard = ({ course, onEdit, onDelete }) => {
  return (
    <div className="admin-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.5rem' }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ 
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.375rem', 
            fontWeight: '700', 
            color: '#0F172A',
            marginBottom: '0.5rem'
          }}>
            {course.name}
          </h3>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
            <p style={{ fontSize: '0.875rem', color: '#64748B', margin: 0, fontWeight: '500' }}>
              {course.duration} • ₹{course.price}
            </p>
          </div>
        </div>
        <span className={`badge ${
          course.status === 'active' ? 'badge-success' : 'badge-gray'
        }`}>
          {course.status}
        </span>
      </div>
      
      <p style={{ fontSize: '0.9375rem', color: '#475569', marginBottom: '1.5rem', lineHeight: '1.6' }}>
        {course.description}
      </p>
      
      {course.features && course.features.length > 0 && (
        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ fontSize: '0.875rem', fontWeight: '600', color: '#0F172A', marginBottom: '0.75rem' }}>
            Features:
          </h4>
          <ul style={{ fontSize: '0.875rem', color: '#475569', listStyleType: 'disc', listStylePosition: 'inside', margin: 0, padding: 0 }}>
            {course.features.map((feature, index) => (
              <li key={index} style={{ marginBottom: '0.25rem' }}>{feature}</li>
            ))}
          </ul>
        </div>
      )}
      
      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <button
          onClick={onEdit}
          className="btn-secondary"
          style={{ flex: 1, fontSize: '0.875rem', padding: '0.625rem 1rem' }}
        >
          <svg style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Edit
        </button>
        <button
          onClick={onDelete}
          className="btn-danger"
          style={{ flex: 1, fontSize: '0.875rem', padding: '0.625rem 1rem' }}
        >
          <svg style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
          Delete
        </button>
      </div>
    </div>
  )
}

const ScheduleForm = ({ schedule, courses, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    course_id: schedule?.course_id || '',
    start_date: schedule?.start_date || '',
    end_date: schedule?.end_date || '',
    time_slot: schedule?.time_slot || '',
    max_students: schedule?.max_students || '',
    enrolled_count: schedule?.enrolled_count || 0,
    status: schedule?.status || 'scheduled'
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave({
      ...formData,
      max_students: parseInt(formData.max_students),
      enrolled_count: parseInt(formData.enrolled_count)
    })
  }

  return (
    <div className="admin-card">
      <h3 style={{ 
        fontFamily: "'Playfair Display', serif",
        fontSize: '1.5rem', 
        fontWeight: '700', 
        color: '#0F172A',
        marginBottom: '1.5rem'
      }}>
        {schedule ? 'Edit Schedule' : 'Add New Schedule'}
      </h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
              Course *
            </label>
            <select
              required
              value={formData.course_id}
              onChange={(e) => setFormData(prev => ({ ...prev, course_id: e.target.value }))}
              className="admin-select"
            >
              <option value="">Select a course</option>
              {courses.map(course => (
                <option key={course.id} value={course.id}>{course.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
              Time Slot *
            </label>
            <input
              type="text"
              required
              placeholder="e.g., 10:00-12:00"
              value={formData.time_slot}
              onChange={(e) => setFormData(prev => ({ ...prev, time_slot: e.target.value }))}
              className="admin-input"
            />
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
              Start Date *
            </label>
            <input
              type="date"
              required
              value={formData.start_date}
              onChange={(e) => setFormData(prev => ({ ...prev, start_date: e.target.value }))}
              className="admin-input"
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
              End Date *
            </label>
            <input
              type="date"
              required
              value={formData.end_date}
              onChange={(e) => setFormData(prev => ({ ...prev, end_date: e.target.value }))}
              className="admin-input"
            />
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
              Max Students *
            </label>
            <input
              type="number"
              required
              min="1"
              value={formData.max_students}
              onChange={(e) => setFormData(prev => ({ ...prev, max_students: e.target.value }))}
              className="admin-input"
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
              Enrolled
            </label>
            <input
              type="number"
              min="0"
              value={formData.enrolled_count}
              onChange={(e) => setFormData(prev => ({ ...prev, enrolled_count: e.target.value }))}
              className="admin-input"
            />
          </div>
          <div>
            <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
              Status
            </label>
            <select
              value={formData.status}
              onChange={(e) => setFormData(prev => ({ ...prev, status: e.target.value }))}
              className="admin-select"
            >
              <option value="scheduled">Scheduled</option>
              <option value="ongoing">Ongoing</option>
              <option value="completed">Completed</option>
            </select>
          </div>
        </div>
        <div style={{ display: 'flex', gap: '1rem', paddingTop: '1rem' }}>
          <button
            type="submit"
            className="btn-primary"
            style={{ flex: 1 }}
          >
            {schedule ? 'Update Schedule' : 'Create Schedule'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="btn-secondary"
            style={{ flex: 1 }}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

const ScheduleCard = ({ schedule, onEdit, onDelete }) => {
  return (
    <div className="admin-card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1.5rem' }}>
        <div style={{ flex: 1 }}>
          <h3 style={{ 
            fontFamily: "'Playfair Display', serif",
            fontSize: '1.25rem', 
            fontWeight: '700', 
            color: '#0F172A',
            marginBottom: '0.75rem'
          }}>
            {schedule.academy_courses?.name || 'Unknown Course'}
          </h3>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: '600', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Dates:
              </span>
              <p style={{ fontSize: '0.875rem', color: '#374151', margin: '0.25rem 0 0 0', fontWeight: '500' }}>
                {new Date(schedule.start_date).toLocaleDateString()} to {new Date(schedule.end_date).toLocaleDateString()}
              </p>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: '600', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Time:
              </span>
              <p style={{ fontSize: '0.875rem', color: '#374151', margin: '0.25rem 0 0 0', fontWeight: '500' }}>
                {schedule.time_slot}
              </p>
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: '600', color: '#64748B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Students:
              </span>
              <p style={{ fontSize: '0.875rem', color: '#374151', margin: '0.25rem 0 0 0', fontWeight: '500' }}>
                {schedule.enrolled_count}/{schedule.max_students}
              </p>
            </div>
          </div>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.75rem' }}>
          <span className={`badge ${
            schedule.status === 'scheduled'
              ? 'badge-info'
              : schedule.status === 'ongoing'
              ? 'badge-warning'
              : 'badge-success'
          }`}>
            {schedule.status}
          </span>
          
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={onEdit}
              className="btn-secondary"
              style={{ fontSize: '0.75rem', padding: '0.5rem 0.75rem' }}
            >
              <svg style={{ width: '0.875rem', height: '0.875rem', marginRight: '0.25rem' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Edit
            </button>
            <button
              onClick={onDelete}
              className="btn-danger"
              style={{ fontSize: '0.75rem', padding: '0.5rem 0.75rem' }}
            >
              <svg style={{ width: '0.875rem', height: '0.875rem', marginRight: '0.25rem' }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AcademyManager