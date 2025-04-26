"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { CalendarIcon, Save, LogOut } from "lucide-react"
import { cn } from "@/lib/utils"

interface Announcement {
  title: string
  location: string
  venue: string
  date: Date | undefined
  timeStart: string
  timeEnd: string
  additionalInfo: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [announcement, setAnnouncement] = useState<Announcement>({
    title: "MAJLIS RUMAH TERBUKA @ JAMUAN HARI RAYA",
    location: "MASJID AL-HIDAYAH",
    venue: "KG. SUNGAI PENCHALA",
    date: new Date("2025-04-13"),
    timeStart: "10:00",
    timeEnd: "13:00",
    additionalInfo: "SEMUA JEMAAH & AHLI KARIAH DIJEMPUT HADIR",
  })
  const [isSaving, setIsSaving] = useState(false)
  const [saveMessage, setSaveMessage] = useState("")

  useEffect(() => {
    // Check if user is authenticated
    const isAuthenticated = localStorage.getItem("isAuthenticated")
    if (!isAuthenticated) {
      router.push("/admin/login")
    }
  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated")
    router.push("/admin/login")
  }

  const handleSave = () => {
    setIsSaving(true)
    setSaveMessage("")

    // Simulate saving to a database
    setTimeout(() => {
      setIsSaving(false)
      setSaveMessage("Pengumuman berjaya dikemaskini!")

      // Save to localStorage for demo purposes
      localStorage.setItem("mosqueAnnouncement", JSON.stringify(announcement))

      // Clear message after 3 seconds
      setTimeout(() => {
        setSaveMessage("")
      }, 3000)
    }, 1000)
  }

  const handleChange = (field: keyof Announcement, value: any) => {
    setAnnouncement((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-emerald-800 text-white p-4 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">Panel Admin Masjid</h1>
          <Button variant="outline" onClick={handleLogout} className="text-white border-white hover:bg-emerald-700">
            <LogOut className="mr-2 h-4 w-4" /> Log Keluar
          </Button>
        </div>
      </header>

      <main className="container mx-auto p-4 md:p-6">
        <Tabs defaultValue="edit" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="edit">Kemaskini Pengumuman</TabsTrigger>
            <TabsTrigger value="preview">Pratonton</TabsTrigger>
          </TabsList>

          <TabsContent value="edit">
            <Card>
              <CardHeader>
                <CardTitle>Kemaskini Pengumuman</CardTitle>
                <CardDescription>Isi maklumat pengumuman yang akan dipaparkan pada skrin TV masjid.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Tajuk Pengumuman</Label>
                  <Input
                    id="title"
                    value={announcement.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Nama Masjid</Label>
                  <Input
                    id="location"
                    value={announcement.location}
                    onChange={(e) => handleChange("location", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="venue">Lokasi</Label>
                  <Input
                    id="venue"
                    value={announcement.venue}
                    onChange={(e) => handleChange("venue", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Tarikh</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full justify-start text-left font-normal",
                          !announcement.date && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {announcement.date ? format(announcement.date, "PPP") : <span>Pilih tarikh</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={announcement.date}
                        onSelect={(date) => handleChange("date", date)}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="timeStart">Masa Mula</Label>
                    <Input
                      id="timeStart"
                      type="time"
                      value={announcement.timeStart}
                      onChange={(e) => handleChange("timeStart", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="timeEnd">Masa Tamat</Label>
                    <Input
                      id="timeEnd"
                      type="time"
                      value={announcement.timeEnd}
                      onChange={(e) => handleChange("timeEnd", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="additionalInfo">Maklumat Tambahan</Label>
                  <Textarea
                    id="additionalInfo"
                    value={announcement.additionalInfo}
                    onChange={(e) => handleChange("additionalInfo", e.target.value)}
                    rows={3}
                  />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                {saveMessage && (
                  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded">
                    {saveMessage}
                  </div>
                )}
                <Button
                  onClick={handleSave}
                  className="ml-auto bg-emerald-600 hover:bg-emerald-700"
                  disabled={isSaving}
                >
                  <Save className="mr-2 h-4 w-4" />
                  {isSaving ? "Menyimpan..." : "Simpan Perubahan"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="preview">
            <Card>
              <CardHeader>
                <CardTitle>Pratonton Pengumuman</CardTitle>
                <CardDescription>Paparan pengumuman seperti yang akan dipaparkan pada skrin TV.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="w-full bg-gradient-to-b from-amber-500 to-amber-600 p-8 rounded-lg text-center">
                  <h2 className="text-4xl font-bold mb-4 text-blue-900 drop-shadow-[0_2px_2px_rgba(255,255,255,0.8)] tracking-wider">
                    {announcement.title}
                  </h2>

                  <div className="text-2xl font-bold text-blue-900 mb-6">
                    <div className="mb-2">{announcement.location}</div>
                    <div>{announcement.venue}</div>
                  </div>

                  <div className="text-3xl font-bold text-blue-900 mb-4">
                    {announcement.date ? format(announcement.date, "d MMMM yyyy") : ""}
                  </div>

                  <div className="text-xl text-blue-900 mb-6">
                    <div>@ {announcement.date ? format(announcement.date, "EEEE") : ""} bermula jam</div>
                    <div>
                      {announcement.timeStart ? format(new Date(`2000-01-01T${announcement.timeStart}`), "h:mm a") : ""}{" "}
                      -{announcement.timeEnd ? format(new Date(`2000-01-01T${announcement.timeEnd}`), "h:mm a") : ""}
                    </div>
                  </div>

                  <div className="bg-yellow-300 text-blue-900 rounded-full px-6 py-3 inline-block font-bold text-xl transform rotate-2 shadow-lg">
                    {announcement.additionalInfo}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}
