"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function MosqueDisplay() {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [countdown, setCountdown] = useState({ hours: 5, minutes: 42, seconds: 54 })
  const [announcement, setAnnouncement] = useState({
    title: "MAJLIS RUMAH TERBUKA @ JAMUAN HARI RAYA",
    location: "MASJID AL-HIDAYAH",
    venue: "KG. SUNGAI PENCHALA",
    date: "2025-04-13",
    timeStart: "10:00",
    timeEnd: "13:00",
    additionalInfo: "SEMUA JEMAAH & AHLI KARIAH DIJEMPUT HADIR",
  })

  // Mosque information
  const mosqueInfo = {
    name: "MASJID TENGKU SARAFUDIN, KUALA NERANG, KEDAH DARULAMAN",
    reminder: 'MOHON SUPAYA TELEFON BIMBIT DI"OFF"KAN SEMASA SOLAT SEDANG BERLANGSUNG',
  }

  // Prayer times
  const prayerTimes = [
    { name: "Imsak", time: "5:46 AM", color: "bg-red-800" },
    { name: "Subuh", time: "5:56 AM", color: "bg-purple-800" },
    { name: "Syuruk", time: "7:05 AM", color: "bg-blue-800" },
    { name: "Zohor", time: "1:18 PM", color: "bg-green-800" },
    { name: "Asar", time: "4:33 PM", color: "bg-amber-600" },
    { name: "Maghrib", time: "7:27 PM", color: "bg-purple-700" },
    { name: "Isyak", time: "8:39 PM", color: "bg-amber-800" },
  ]

  // Next prayer
  const nextPrayer = {
    name: "SUBUH",
    time: "5:56 AM",
  }

  // Update current time every second and load announcement data
  useEffect(() => {
    // Load announcement from localStorage if available
    const savedAnnouncement = localStorage.getItem("mosqueAnnouncement")
    if (savedAnnouncement) {
      try {
        const parsed = JSON.parse(savedAnnouncement)
        // Convert date string back to Date object if it exists
        if (parsed.date) {
          parsed.date = new Date(parsed.date)
        }
        setAnnouncement(parsed)
      } catch (e) {
        console.error("Error parsing saved announcement", e)
      }
    }

    const timer = setInterval(() => {
      setCurrentTime(new Date())

      // Update countdown
      setCountdown((prev) => {
        let { hours, minutes, seconds } = prev

        if (seconds > 0) {
          seconds -= 1
        } else {
          seconds = 59
          if (minutes > 0) {
            minutes -= 1
          } else {
            minutes = 59
            if (hours > 0) {
              hours -= 1
            }
          }
        }

        return { hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  // Format date for display
  const formatDate = () => {
    // Islamic date (Hijri) - hardcoded for demo
    const hijriDate = "29 Shawwal 1446"

    // Gregorian date
    const options = {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }
    const gregorianDate = currentTime.toLocaleDateString("ms-MY", options)

    return { hijriDate, gregorianDate }
  }

  const { hijriDate, gregorianDate } = formatDate()

  // Format time for display
  const formatTime = () => {
    return currentTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    })
  }

  // Format announcement date
  const formatAnnouncementDate = () => {
    if (!announcement.date) return ""

    const date = typeof announcement.date === "string" ? new Date(announcement.date) : announcement.date

    return new Intl.DateTimeFormat("ms-MY", {
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long",
    }).format(date)
  }

  // Format announcement time
  const formatAnnouncementTime = (timeString) => {
    if (!timeString) return ""

    try {
      const [hours, minutes] = timeString.split(":")
      const date = new Date()
      date.setHours(Number.parseInt(hours, 10))
      date.setMinutes(Number.parseInt(minutes, 10))

      return new Intl.DateTimeFormat("ms-MY", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      }).format(date)
    } catch (e) {
      return timeString
    }
  }

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Top bar with date and time */}
      <div className="flex justify-between items-center bg-black p-4">
        <div className="text-xl md:text-2xl font-bold">
          <div>{hijriDate}</div>
          <div>{gregorianDate}</div>
        </div>
        <div className="text-center">
          <h1 className="text-2xl md:text-3xl font-bold">{mosqueInfo.name}</h1>
        </div>
        <div className="text-4xl md:text-6xl font-bold text-white">
          {formatTime()}
          <Link href="/admin" className="block text-xs text-gray-400 text-right mt-1 hover:text-gray-300">
            Admin
          </Link>
        </div>
      </div>

      {/* Main content */}
      <div className="flex flex-1">
        {/* Left column - Prayer times */}
        <div className="w-1/5 flex flex-col">
          {prayerTimes.map((prayer) => (
            <div
              key={prayer.name}
              className={`${prayer.color} p-4 flex justify-between items-center border-b border-gray-700 h-1/7`}
            >
              <div className="text-xl md:text-2xl font-bold">{prayer.name}</div>
              <div className="text-xl md:text-2xl font-bold">{prayer.time}</div>
            </div>
          ))}
        </div>

        {/* Center column - Announcement */}
        <div className="w-3/5 flex flex-col items-center justify-center p-4 bg-gradient-to-b from-amber-500 to-amber-600 relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('/placeholder.svg?height=600&width=800')] bg-cover bg-center"></div>
          </div>

          <div className="relative z-10 text-center w-full h-full flex flex-col items-center justify-center">
            <h2 className="text-4xl md:text-6xl font-bold mb-4 text-blue-900 drop-shadow-[0_2px_2px_rgba(255,255,255,0.8)] tracking-wider">
              {announcement.title}
            </h2>

            <div className="text-2xl md:text-4xl font-bold text-blue-900 mb-6">
              <div className="mb-2">{announcement.location}</div>
              <div>{announcement.venue}</div>
            </div>

            <div className="text-3xl md:text-5xl font-bold text-blue-900 mb-4">{formatAnnouncementDate()}</div>

            <div className="text-xl md:text-2xl text-blue-900 mb-6">
              <div>
                @{" "}
                {typeof announcement.date === "string"
                  ? new Date(announcement.date).toLocaleDateString("ms-MY", { weekday: "long" })
                  : announcement.date?.toLocaleDateString("ms-MY", { weekday: "long" })}{" "}
                bermula jam
              </div>
              <div>
                {formatAnnouncementTime(announcement.timeStart)} - {formatAnnouncementTime(announcement.timeEnd)}
              </div>
            </div>

            <div className="bg-yellow-300 text-blue-900 rounded-full px-6 py-3 inline-block font-bold text-xl md:text-2xl transform rotate-2 shadow-lg">
              {announcement.additionalInfo}
            </div>
          </div>

          {/* Decorative elements */}
          <div className="absolute top-10 left-10 opacity-70">
            <div className="w-20 h-32 bg-blue-800 relative">
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-blue-800 flex justify-around">
                <div className="w-2 h-6 bg-white rounded-b-full"></div>
                <div className="w-2 h-6 bg-white rounded-b-full"></div>
                <div className="w-2 h-6 bg-white rounded-b-full"></div>
              </div>
            </div>
          </div>

          <div className="absolute top-10 right-10 opacity-70">
            <div className="w-20 h-32 bg-blue-800 relative">
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-blue-800 flex justify-around">
                <div className="w-2 h-6 bg-white rounded-b-full"></div>
                <div className="w-2 h-6 bg-white rounded-b-full"></div>
                <div className="w-2 h-6 bg-white rounded-b-full"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Right column - Next prayer */}
        <div className="w-1/5 bg-gray-900 flex flex-col items-center justify-center p-4">
          <div className="text-center mb-6">
            <div className="text-2xl font-bold text-yellow-400 mb-2">SOLAT</div>
            <div className="text-2xl font-bold text-yellow-400 mb-4">SETERUSNYA</div>
            <div className="text-4xl font-bold mb-4">{nextPrayer.name}</div>
            <div className="text-3xl font-bold text-green-400">{nextPrayer.time}</div>
          </div>

          <div className="text-center mt-6">
            <div className="text-6xl font-bold text-amber-500 mb-2 font-mono">
              {String(countdown.hours).padStart(2, "0")}:{String(countdown.minutes).padStart(2, "0")}:
              {String(countdown.seconds).padStart(2, "0")}
            </div>
            <div className="text-lg">JAM : MINIT : SAAT</div>
          </div>
        </div>
      </div>

      {/* Bottom bar - Reminder */}
      <div className="bg-black p-4 text-center text-xl font-bold">{mosqueInfo.reminder}</div>
    </div>
  )
}
